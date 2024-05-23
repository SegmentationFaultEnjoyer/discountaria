export type ApiListResponse<T> = {
  Data: T
  Links: {
    Next: string
  }
}
