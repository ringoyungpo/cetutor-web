import Validator from 'validator'
import { isEmpty } from 'lodash'

export function validatoCommentInput(data) {
  const errors = {}

  if (isEmpty(data.text)) errors.text = 'text field is required'
  else if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post text charactors lenth must be 10 to 300'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
