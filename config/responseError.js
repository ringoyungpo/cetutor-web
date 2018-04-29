// Custom Error for User
export default class ResponseError extends Error {
  constructor(status, detail, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(
      message
        ? message
        : Object.values(detail)
            .map(
              error =>
                typeof error !== 'object' ? error : Object.values(error),
            )
            .join('\n'),
      ...params,
    )

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError)
    }

    // Custom debugging information
    this.status = status
    this.detail = detail
    this.name = 'ResponseError'
    this.date = new Date()
  }
}
