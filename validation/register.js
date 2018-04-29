import Validator from 'validator'
import { isEmpty } from 'lodash'

export function validatoRegisterInput(data) {
  const errors = {}

  if (isEmpty(data.nickname)) {
    errors.nickname = 'Nickname field is required'
  } else if (!Validator.isLength(data.nickname, { min: 2, max: 30 })) {
    errors.nickname = 'Nickname charactors length must be between 2 and 30'
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required'
  } else if (!Validator.isLength(data.password, { min: 5, max: 30 })) {
    errors.password = 'Password charactors length must be between 5 and 30'
  }

  if (isEmpty(data.passwordComfirmed)) {
    errors.passwordComfirmed = 'Confirm password field is required'
  } else if (!Validator.equals(data.password, data.passwordComfirmed)) {
    errors.passwordComfirmed = 'Passwords shoud be matched'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
