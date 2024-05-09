import { has, isEmpty } from 'lodash'

import { WithProperty } from '@/types'

type Validator = (value: unknown) => string | null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidatorFunc = (...args: any[]) => Validator

export const applyRules =
  (...rules: Validator[]) =>
  (value: unknown) => {
    for (const rule of rules) {
      const result = rule(value)

      if (!result) continue

      return result
    }

    return null
  }

export const maxLength: ValidatorFunc =
  (length: number) => (value: unknown) => {
    if (!has(value, 'length')) return 'Not valid input type'

    const _value = value as WithProperty<'length', number>

    return _value.length > length
      ? `This field should contain maximum ${length} chars`
      : null
  }

export const minLength = (length: number) => (value: unknown) => {
  if (!has(value, 'length')) return 'Not valid input type'

  const _value = value as WithProperty<'length', number>

  return _value.length < length
    ? `This field should contain minimum ${length} chars`
    : null
}

export const minValue = (min: number) => (value: unknown) =>
  Number(value) < Number(min) ? `Min value is ${min}` : null

export const maxValue = (max: number) => (value: unknown) =>
  Number(value) > Number(max) ? `Max value is ${max}` : null

/**
 * Creates a validator function that checks if a value is not present in the
 * given list.
 *
 * @template T - The type of elements in the list. If `comparator` function
 * isn't passed `T` will be treated as primitive type
 * @param list - The list of elements to check against.
 * @param [comparator] - An optional custom comparator function to determine
 * equality between elements.
 *
 * @returns A validator function that checks if the value is not in the list.
 *
 */
export const notInList =
  <T>(list: T[], comparator?: (entityFromList: T, comparable: T) => boolean) =>
  (value: unknown) => {
    const _value = typeof value === 'string' ? value.toLowerCase() : value

    const validate = comparator
      ? () => list.some(el => comparator(el, _value as T))
      : () => list.some(el => el === (_value as T))

    return validate() ? 'This item is already in list' : null
  }

export const required = (value: unknown) =>
  isEmpty(value) ? 'Required field' : null
