import Validator from 'validator'
import { isEmpty } from 'lodash'

export function validatoLoginInput(data) {
  const errors = {}

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

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
