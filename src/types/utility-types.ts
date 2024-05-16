export type WithProperty<Key extends string, VType> = {
  [key in Key]: VType
}
