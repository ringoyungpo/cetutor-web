import React from 'react'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'

const Reading = ({ sections, errors, onChange }) => {
  const { bankedCloze } = sections
  const { passage, options, rightOrder } = bankedCloze
  return (
    <div>
      <h4>Part III Reading Comprehension</h4>
      <b>Section A</b>
      <br />
      <b>Directions:</b>
      <p>
        In this section, there is a passage with ten blanks. You are required to
        select one word for each blank from a list of choices given in a word
        bank following the passage. Read the passage through carefully before
        making your choices. Each choice in the bank is identified by a letter.
        Please mark the corresponding letter for each item onAnswer Sheet 2 with
        a single line through the centre. You may not use any of the words in
        the bank more than once.
      </p>
      <TextAreaFieldGroup
        placeholder="Please leave banked as __ only"
        name="this.state.papers.paper.reading.sections.bankedCloze.passage"
        value={passage}
        onChange={onChange}
        error={
          errors &&
          errors['reading.sections.bankedCloze.passage'] &&
          errors['reading.sections.bankedCloze.passage'].message
        }
      />
      <b>Options</b>
      {options.map((optionValue, optionIndex) => {
        return (
          <div key={optionIndex}>
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.bankedCloze.options.${optionIndex}.delete`}
              className="btn btn-danger float-right"
              onClick={onChange}
              value="Delete This Option"
            />
            <TextFieldGroup
              title={String.fromCharCode(optionIndex + 65)}
              placeholder="option"
              name={`this.state.papers.paper.reading.sections.bankedCloze.options.${optionIndex}`}
              value={optionValue}
              onChange={onChange}
              error={
                errors &&
                errors[`reading.sections.bankedCloze.options.${optionIndex}`] &&
                errors[`reading.sections.bankedCloze.options.${optionIndex}`]
                  .message
              }
            />
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.bankedCloze.options.${optionIndex}.insert`}
              className="btn btn-success"
              onClick={onChange}
              value="Insert A Option"
            />
          </div>
        )
      })}
      <b>rightOrder</b>
      {rightOrder.map((rightOrderValue, rightOrderIndex) => {
        const rightOrderOptions = options.map((optionValue, optionIndex) => {
          return {
            label: `${String.fromCharCode(optionIndex + 65)}: ${optionValue}`,
            value: String(optionIndex)
          }
        })

        return (
          <div key={rightOrderIndex}>
            <SelectListGroup
              title={`${rightOrderIndex + 1}`}
              placeholder={`Right Order ${rightOrderIndex + 1}`}
              name={`this.state.papers.paper.reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`}
              value={rightOrderValue}
              onChange={onChange}
              options={rightOrderOptions}
              error={
                errors &&
                errors[
                  `reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`
                ] &&
                errors[
                  `reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`
                ].message
              }
            />
            {/* <TextFieldGroup
              title={rightOrderIndex + 1}
              placeholder="Right Order"
              name={`this.state.papers.paper.reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`}
              value={rightOrderValue}
              onChange={onChange}
              error={
                errors &&
                errors[
                  `reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`
                ] &&
                errors[
                  `reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`
                ].message
              }
            /> */}
          </div>
        )
      })}
    </div>
  )
}

Reading.prototype = {
  sections: PropTypes.shape({
    bankedCloze: PropTypes.shape({
      passage: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      rightOrder: PropTypes.arrayOf(
        PropTypes.shape(PropTypes.number.isRequired).isRequired
      ).isRequired
    }).isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default Reading
