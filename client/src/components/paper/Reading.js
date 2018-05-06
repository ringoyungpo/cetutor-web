import React from 'react'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'

const Reading = ({ sections, errors, onChange }) => {
  const { bankedCloze, locating, selection } = sections
  const { passage, options, rightOrder } = bankedCloze
  const { title, paragraphs, questions } = locating
  const { passages } = selection
  const rightAnswerOptions = paragraphs.map(
    (paragraphValue, paragraphIndex) => {
      return {
        label: `${String.fromCharCode(
          paragraphIndex + 65
        )}: ${paragraphValue.substr(0, 32)}...`,
        value: String(paragraphIndex)
      }
    }
  )
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
        Please mark the corresponding letter for each item on Answer Sheet with
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
            label: `${String.fromCharCode(
              optionIndex + 65
            )}: ${optionValue.substr(0, 32)}...`,
            value: String(optionIndex)
          }
        })

        return (
          <div key={rightOrderIndex}>
            <SelectListGroup
              title={`${rightOrderIndex + 1}`}
              placeholder={`Right Order ${rightOrderIndex + 1}`}
              name={`this.state.papers.paper.reading.sections.bankedCloze.rightOrder.${rightOrderIndex}`}
              value={String(rightOrderValue)}
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
          </div>
        )
      })}
      <b>Section B</b>
      <br />
      <b>Directions:</b>
      <p>
        In this section, you are going to read a passage with ten statements
        attached to it. Each statement contains information given in one of the
        paragraphs. Identify the paragraph from which the information is
        derived. You may choose a paragraph more than once. Each paragraph is
        marked with a letter. Answer the questions by marking the corresponding
        letter on Answer Sheet.
      </p>
      <TextFieldGroup
        title="Passage Title"
        placeholder="Enter the passage title"
        name="this.state.papers.paper.reading.sections.locating.title"
        value={title}
        onChange={onChange}
        error={
          errors &&
          errors['reading.sections.locating.title'] &&
          errors['reading.sections.locating.title'].message
        }
      />

      {paragraphs.map((paragraphValue, paragraphIndex) => {
        return (
          <div key={paragraphIndex}>
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.locating.paragraphs.${paragraphIndex}.delete`}
              className="btn btn-danger float-right"
              onClick={onChange}
              value="Delete a paragraph"
            />
            <TextAreaFieldGroup
              title={String.fromCharCode(paragraphIndex + 65)}
              placeholder="Enter the paragraph content"
              name={`this.state.papers.paper.reading.sections.locating.paragraphs.${paragraphIndex}`}
              value={paragraphValue}
              onChange={onChange}
              error={
                errors &&
                errors[
                  `reading.sections.locating.paragraphs.${paragraphIndex}`
                ] &&
                errors[`reading.sections.locating.paragraphs.${paragraphIndex}`]
                  .message
              }
            />
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.locating.paragraphs.${paragraphIndex}.insert`}
              className="btn btn-success"
              onClick={onChange}
              value="Insert a paragraph"
            />
          </div>
        )
      })}
      <b>Questions</b>
      {questions.map((questionValue, questionIndex) => {
        return (
          <div key={questionIndex}>
            <TextFieldGroup
              title={String(questionIndex + 1)}
              placeholder="Enter the question content"
              name={`this.state.papers.paper.reading.sections.locating.questions.${questionIndex}.questionContent`}
              value={questionValue.questionContent}
              onChange={onChange}
              error={
                errors &&
                errors[
                  `reading.sections.locating.questions.${questionIndex}.questionContent`
                ] &&
                errors[
                  `reading.sections.locating.questions.${questionIndex}.questionContent`
                ].message
              }
            />
            <SelectListGroup
              placeholder={`Right Answer ${questionIndex + 1}`}
              name={`this.state.papers.paper.reading.sections.locating.questions.${questionIndex}.rightAnswer`}
              value={String(questionValue.rightAnswer)}
              onChange={onChange}
              options={rightAnswerOptions}
              error={
                errors &&
                errors[
                  `reading.sections.locating.questions.${questionIndex}.rightAnswer`
                ] &&
                errors[
                  `reading.sections.locating.questions.${questionIndex}.rightAnswer`
                ].message
              }
            />
          </div>
        )
      })}
      <b>Section C</b>
      <br />
      <b>Directions</b>
      <p>
        There are 2 passages in this section. Each passage is followed by some
        questions or unfinished statements. For each of them there are four
        choices marked A,B,C and D.You should decide on the best choice and mark
        the corresponding letter on Answer Sheet 2 with a single line through
        the centre.
      </p>
      {passages.map((passageValue, passageIndex) => {
        const { passageContent, questions, rightAnswer } = passageValue
        return (
          <div key={passageIndex}>
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.delete`}
              className="btn btn-danger float-right"
              onClick={onChange}
              value="Delete A Passage"
            />
            <TextAreaFieldGroup
              title={`Passage ${passageIndex + 1}`}
              placeholder="Enter the passage Content"
              name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.passageContent`}
              value={passageValue.passageContent}
              onChange={onChange}
              error={
                errors &&
                errors[
                  `reading.sections.selection.passages.${passageIndex}.passageContent`
                ] &&
                errors[
                  `reading.sections.selection.passages.${passageIndex}.passageContent`
                ].message
              }
            />

            {questions.map((questionValue, questionIndex) => {
              const rightAnswerOptions = questionValue.options.map(
                (optionValue, optionIndex) => {
                  return {
                    label: `${String.fromCharCode(
                      optionIndex + 65
                    )}: ${optionValue.substr(0, 32)}...`,
                    value: String(optionIndex)
                  }
                }
              )
              return (
                <div key={questionIndex}>
                  <input
                    type="button"
                    name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.delete`}
                    className="btn btn-danger float-right"
                    onClick={onChange}
                    value="Delete A Qusetion"
                  />
                  <TextFieldGroup
                    title={`Question ${questionIndex + 1}`}
                    placeholder="Enter the question Content"
                    name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.questionContent`}
                    value={questionValue.questionContent}
                    onChange={onChange}
                    error={
                      errors &&
                      errors[
                        `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.questionContent`
                      ] &&
                      errors[
                        `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.questionContent`
                      ].message
                    }
                  />
                  <b>Options</b>
                  {questionValue.options.map((optionValue, optionIndex) => {
                    return (
                      <div key={optionIndex}>
                        <TextFieldGroup
                          placeholder="Enter the option Content"
                          name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.options.${optionIndex}`}
                          value={questionValue.options[optionIndex]}
                          onChange={onChange}
                          error={
                            errors &&
                            errors[
                              `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.options.${optionIndex}`
                            ] &&
                            errors[
                              `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.options.${optionIndex}`
                            ].message
                          }
                        />
                      </div>
                    )
                  })}
                  <SelectListGroup
                    title={`Right Answer ${questionIndex + 1}.`}
                    placeholder="Right Answer"
                    name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.rightAnswer`}
                    value={String(questionValue.rightAnswer)}
                    onChange={onChange}
                    options={rightAnswerOptions}
                    error={
                      errors &&
                      errors[
                        `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.rightAnswer`
                      ] &&
                      errors[
                        `reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.rightAnswer`
                      ].message
                    }
                  />
                  <input
                    type="button"
                    name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.questions.${questionIndex}.insert`}
                    className="btn btn-success"
                    onClick={onChange}
                    value="Insert A Question"
                  />
                </div>
              )
            })}
            <input
              type="button"
              name={`this.state.papers.paper.reading.sections.selection.passages.${passageIndex}.insert`}
              className="btn btn-success"
              onClick={onChange}
              value="Insert A Passage"
            />
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
    }).isRequired,
    locating: PropTypes.shape({
      title: PropTypes.string.isRequired,
      paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          questionContent: PropTypes.string.isRequired,
          rightAnswer: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
    selection: PropTypes.shape({
      passages: PropTypes.arrayOf(
        PropTypes.shape({
          passageContent: PropTypes.string.isRequired,
          questions: PropTypes.arrayOf(
            PropTypes.shape({
              questionContent: PropTypes.string.isRequired,
              options: PropTypes.arrayOf(PropTypes.string.isRequired)
                .isRequired,
              rightAnswer: PropTypes.number.isRequired
            }).isRequired
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default Reading
