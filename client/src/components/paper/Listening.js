import React from 'react'
import PropTypes from 'prop-types'
import SelectListGroup from '../common/SelectListGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import ReactAudioPlayer from 'react-audio-player'
import isEmpty from 'lodash'
import {
  NEWS_REPORT,
  CONVERSATION,
  PASSANGE,
  RECORD,
  LOADING_AUDIO_URL
} from '../../constant/paperConst'

const Listening = ({ sections, errors, onChange }) => {
  const sectionTitleOptions = [
    { label: 'News Report', value: NEWS_REPORT },
    { label: 'Conversation', value: CONVERSATION },
    { label: 'Passange', value: PASSANGE },
    { label: 'Record', value: RECORD }
  ]

  return (
    <div>
      {sections.map((sectionValue, sectionIndex) => {
        const { sectionTitle, directions, modules } = sectionValue
        return (
          <div key={sectionIndex}>
            <span>
              <b>Section {String.fromCharCode(sectionIndex + 65)}</b>
              <input
                type="button"
                name={`this.state.paper.listening.sections.${sectionIndex}.delete`}
                className="btn btn-danger float-right"
                onClick={onChange}
                value="Delete This Section"
              />
            </span>

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
            {modules.map((moduleValue, moduleIndex) => {
              const { moduleTitle, moduleSound, questions } = moduleValue
              const { url } = moduleSound
              return (
                <div key={moduleIndex}>
                  <b>
                    {sectionTitle} {moduleIndex + 1}.{'\t'}
                  </b>
                  <span>
                    {/* <Audio src={url} id={moduleIndex} /> */}

                    {!isEmpty(url) ? (
                      <ReactAudioPlayer src={url} controls />
                    ) : (
                      'No Audio Here'
                    )}

                    <input
                      type="file"
                      name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.moduleSound`}
                      onChange={onChange}
                      accept="audio/*"
                    />
                    {/* <embed height="100" width="100" src="url" /> */}
                  </span>
                  <input
                    type="button"
                    name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.delete`}
                    className="btn btn-danger float-right"
                    onClick={onChange}
                    value="Delete This Module"
                  />
                  <TextFieldGroup
                    title="Module Title"
                    placeholder="Module Title"
                    name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.moduleTitle`}
                    value={moduleTitle}
                    onChange={onChange}
                    error={
                      errors &&
                      errors[
                        `listening.sections.${sectionIndex}.modules.${moduleIndex}.moduleTitle`
                      ] &&
                      errors[
                        `listening.sections.${sectionIndex}.modules.${moduleIndex}.moduleTitle`
                      ].message
                    }
                  />
                  {questions.map((questionValue, questionIndex) => {
                    const {
                      questionSound,
                      options,
                      rightAnswer
                    } = questionValue
                    const { url } = questionSound
                    const rightAnswerOptions = options.map(
                      (optionValue, optionIndex) => {
                        return {
                          label: `${String.fromCharCode(
                            optionIndex + 65
                          )}: ${optionValue}`,
                          value: String(optionIndex)
                        }
                      }
                    )
                    return (
                      <div key={questionIndex}>
                        <span>
                          <b>Question {questionIndex + 1}. </b>
                          {!isEmpty(url) ? (
                            <ReactAudioPlayer src={url} controls />
                          ) : (
                            'No Audio Here'
                          )}
                          <input
                            type="file"
                            name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.questionSound`}
                            onChange={onChange}
                            accept="audio/*"
                          />
                        </span>
                        {options.map(
                          (optionValue, optionIndex, optionsArray) => {
                            return (
                              <div key={optionIndex}>
                                <TextFieldGroup
                                  placeholder="Question Option"
                                  name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.options.${optionIndex}`}
                                  value={optionValue}
                                  onChange={onChange}
                                  error={
                                    errors &&
                                    errors[
                                      `listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.options.${optionIndex}`
                                    ] &&
                                    errors[
                                      `listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.options.${optionIndex}`
                                    ].message
                                  }
                                />
                              </div>
                            )
                          }
                        )}
                        <SelectListGroup
                          title={`Right Answer ${questionIndex + 1}.`}
                          placeholder="Right Answer"
                          name={`this.state.paper.listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.rightAnswer`}
                          value={String(rightAnswer) || '0'}
                          onChange={onChange}
                          options={rightAnswerOptions}
                          error={
                            errors &&
                            errors[
                              `listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.rightAnswer`
                            ] &&
                            errors[
                              `listening.sections.${sectionIndex}.modules.${moduleIndex}.questions.${questionIndex}.rightAnswer`
                            ].message
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <input
              type="button"
              name={`this.state.paper.listening.sections.${sectionIndex}.append`}
              className="btn btn-success"
              onClick={onChange}
              value="Append A New Section"
            />
          </div>
        )
      })}
      {sections.length === 0 ? (
        <input
          type="button"
          name={`this.state.paper.listening.sections.post`}
          className="btn btn-success"
          onClick={onChange}
          value="Add A New Section"
        />
      ) : null}
    </div>
  )
}

Listening.prototype = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      directions: PropTypes.string.isRequired,
      sectionTitle: PropTypes.string.isRequired,
      modules: PropTypes.arrayOf(
        PropTypes.shape({
          moduleSound: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired
            })
          ).isRequired,
          moduleTitle: PropTypes.string.isRequired,
          questions: PropTypes.arrayOf(
            PropTypes.shape({
              questionSound: PropTypes.arrayOf(
                PropTypes.shape({
                  url: PropTypes.string.isRequired
                })
              ).isRequired,
              options: PropTypes.arrayOf(PropTypes.string.isRequired)
                .isRequired,
              rightAnswer: PropTypes.number.isRequired
            })
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default Listening
