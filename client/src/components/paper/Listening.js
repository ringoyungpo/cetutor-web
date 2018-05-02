import React from 'react'
import PropTypes from 'prop-types'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import {
  NEWS_REPORT,
  CONVERSATION,
  PASSANGE,
  RECORD
} from '../../constant/paperConst'

const Listening = ({ sections, errors, onChange }) => {
  const sectionTitleOptions = [
    { label: 'News_Report', value: NEWS_REPORT },
    { label: 'Conversation', value: CONVERSATION },
    { label: 'Passange', value: PASSANGE },
    { label: 'Record', value: RECORD }
  ]

  return (
    <div>
      {sections.map((sectionValue, sectionIndex) => {
        const { sectionTitle, directions } = sectionValue
        return (
          <div key={sectionIndex}>
            <b>Section {String.fromCharCode(sectionIndex + 65)}</b>
            <SelectListGroup
              title="Title"
              placeholder="Section Title"
              name={`this.state.paper.listening.sections.${sectionIndex}.sectionTitle`}
              value={sectionTitle || NEWS_REPORT}
              onChange={onChange}
              options={sectionTitleOptions}
              error={
                errors &&
                errors[`listening.sections.${sectionIndex}.sectionTitle`] &&
                errors[`listening.sections.${sectionIndex}.sectionTitle`]
                  .message
              }
            />

            <b>Directions:</b>
            <TextAreaFieldGroup
              placeholder="Section Directions"
              name={`this.state.paper.listening.sections.${sectionIndex}.directions`}
              value={directions || ''}
              onChange={onChange}
              error={
                errors &&
                errors[`listening.sections.${sectionIndex}.directions`] &&
                errors[`listening.sections.${sectionIndex}.directions`].message
              }
            />
            <p>{sectionValue.sectionTitle + '  ' + sectionIndex}</p>
            <p>{sectionValue.directions}</p>
          </div>
        )
      })}
    </div>
  )
}

Listening.prototype = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      directions: PropTypes.string.isRequired,
      sectionTitle: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default Listening
