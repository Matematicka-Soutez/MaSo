const config = require('../../config')
const responseErrors = require('./../utils/errors/response')
const appErrors = require('./../utils/errors/application')
const errorLogger = require('./../utils/logger').errorLogger

module.exports = {
  handleNotFound,
  handleErrors,
  catchHandler,
}

function catchHandler(err, mappings) {
  mappings.forEach(mapping => {
    if (err instanceof mapping[0]) {
      throw new mapping[1](...mapping[2])
    }
  })
  throw err
}

function handleNotFound() {
  throw new responseErrors.NotFoundError()
}

async function handleErrors(ctx, next) {
  try {
    return await next()
  } catch (err) {
    let responseError = err

    if (err instanceof appErrors.ValidationError) {
      // Handle ValidationErrors here, so we dont have to in every handler
      responseError = new responseErrors.BadRequestError(err.message)
    } else if (!(err instanceof responseErrors.ResponseError)) {
      // This should never happen, log appropriatelly
      errorLogger.error(err)
      responseError = new responseErrors.InternalServerError()
    }
    // Prepare error response
    ctx.status = responseError.status
    ctx.body = {
      type: responseError.type,
      message: responseError.message,
      stack: config.env === 'development' && responseError.stack ? responseError.stack : undefined, // eslint-disable-line no-undefined, max-len
    }
    return true
  }
}
