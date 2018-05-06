import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { PaperTemplate } from './paperTemplate'

import Spinner from '../common/Spinner'
import { isEmpty } from 'lodash'
import Listening from './Listening'
import Reading from './Reading'
import {
  CET_4,
  CET_6,
  NEWS_REPORT,
  CONVERSATION,
  PASSANGE,
  RECORD
} from '../../constant/paperConst'

export default class PaperEditor extends Component {
  componentWillMount() {
    if (this.props.match.params.paperId) {
      this.props.getPaperById(
        this.props.match.params.paperId,
        this.props.history
      )
    } else {
      this.props.setPaperEditing(JSON.parse(PaperTemplate))
    }
  }

  onSubmit(e) {
    e.preventDefault()

    if (!this.props.match.params.paperId) {
      this.props.createPaper({ ...this.props.papers.paper }, this.props.history)
    } else
      this.props.updatePaper(
        { ...this.props.papers.paper, _id: this.props.match.params.paperId },
        this.props.history
      )
  }

  render() {
    const isCreating = () => isEmpty(this.props.match.params.paperId)
    const { papers, errors, onPaperEditChange, fileUploadHandler } = this.props
    const { paper, loading } = papers
    const { title, level, writing, listening, reading, translation } =
      paper || {}

    const options = [
      { label: 'CET-4', value: 'CET_4' },
      { label: 'CET-6', value: 'CET_6' }
    ]

    const paperEditorForm = loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h2>Paper</h2>
        <TextFieldGroup
          title="Title"
          placeholder="Paper Title"
          name="this.state.papers.paper.title"
          value={title}
          onChange={onPaperEditChange}
          error={errors && errors.title && errors.title.message}
        />
        <SelectListGroup
          title="Level"
          placeholder="CET-4"
          name="this.state.papers.paper.level"
          value={level}
          onChange={onPaperEditChange}
          options={options}
          error={errors && errors.level && errors.level.message}
        />
        <h4>Part I Writing</h4>
        {writing && (
          <TextAreaFieldGroup
            title="Directions:"
            placeholder="Writing directions"
            name="this.state.papers.paper.writing.directions"
            value={writing.directions}
            onChange={onPaperEditChange}
            error={
              errors &&
              errors['writing.directions'] &&
              errors['writing.directions'].message
            }
          />
        )}

        {listening && (
          <Listening
            fileUploadHandler={fileUploadHandler}
            sections={listening.sections}
            onChange={onPaperEditChange}
            errors={errors}
          />
        )}

        {reading && (
          <Reading
            sections={reading.sections}
            onChange={onPaperEditChange}
            errors={errors}
          />
        )}

        <h4>Part IV Translation</h4>
        <b>Directions:</b>
        <p>
          For this part, you are allowed 30 minted to translate a passage from
          Chinese into English. You should write your answer on{' '}
          <b>Answer Sheet</b>
        </p>
        {translation && (
          <TextAreaFieldGroup
            placeholder="Translation Question"
            name="this.state.papers.paper.translation.question"
            value={translation.question}
            onChange={onPaperEditChange}
            error={
              errors &&
              errors['translation.question'] &&
              errors['translation.question'].message
            }
          />
        )}
        <input
          type="submit"
          value="Submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    )

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">
                {isCreating() ? 'Create' : 'Updating'} Your Paper
              </h1>
              <p className="lead text-center">
                Let's get some information to make your paper completed
              </p>
              {paperEditorForm}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PaperEditor.propTypes = {
  papers: PropTypes.shape({
    isloading: PropTypes.bool,
    paper: PropTypes.shape({
      title: PropTypes.string.isRequired,
      level: PropTypes.string.isRequired,
      writing: PropTypes.shape({
        directions: PropTypes.string.isRequired
      }).isRequired,
      listening: PropTypes.shape({
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            sectionTitle: PropTypes.string.isRequired,
            modules: PropTypes.arrayOf(
              PropTypes.shape({
                moduleSound: PropTypes.shape({
                  url: PropTypes.string.isRequired
                }),
                questions: PropTypes.arrayOf(
                  PropTypes.shape({
                    questionSound: PropTypes.shape({
                      url: PropTypes.string.isRequired
                    }),
                    options: PropTypes.arrayOf(PropTypes.string.isRequired)
                      .isRequired,
                    rightAnswer: PropTypes.number.isRequired
                  })
                ).isRequired
              }).isRequired
            ).isRequired
          }).isRequired
        ).isRequired
      }).isRequired,
      reading: PropTypes.shape({
        sections: PropTypes.shape({
          bankedCloze: PropTypes.shape({
            passage: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            rightOrder: PropTypes.arrayOf(PropTypes.number.isRequired)
              .isRequired
          }).isRequired,
          locating: PropTypes.shape({
            title: PropTypes.string.isRequired,
            paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired)
              .isRequired,
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
        }).isRequired
      }).isRequired,
      translation: PropTypes.shape({
        question: PropTypes.string.isRequired
      }).isRequired
    })
  }).isRequired,
  errors: PropTypes.object.isRequired,
  createPaper: PropTypes.func.isRequired,
  updatePaper: PropTypes.func.isRequired,
  getPaperById: PropTypes.func.isRequired,
  onPaperEditChange: PropTypes.func.isRequired,
  setPaperEditing: PropTypes.func.isRequired,
  fileUploadHandler: PropTypes.func.isRequired
}
