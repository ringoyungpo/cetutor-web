const Validator = require('validator')
const isEmpty = require('lodash').isEmpty

module.exports = function validateRegisterInput(data) {
  let errors = {}

  if (isEmpty(data.nickname)) {
    errors.nickname = 'Nickname field is required'
  } else if (!Validator.isLength(data.nickname, { min: 2, max: 30 })) {
    errors.nickname = 'Nickname must be between 2 and 30 characters'
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required'
  } else if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (isEmpty(data.passwordComfirmed)) {
    errors.passwordComfirmed = 'Confirm Password field is required'
  } else if (!Validator.equals(data.password, data.passwordComfirmed)) {
    errors.passwordComfirmed = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
