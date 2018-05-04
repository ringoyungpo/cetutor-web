import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createPaper } from '../../actions/paperActions'
import { updatePaper } from '../../actions/paperActions'
import { getPaperById } from '../../actions/paperActions'
import Spinner from '../common/Spinner'
import { isEmpty } from 'lodash'
import Listening from './Listening'
import {
  CET_4,
  CET_6,
  NEWS_REPORT,
  CONVERSATION,
  PASSANGE,
  RECORD
} from '../../constant/paperConst'
import axios from 'axios'
import { CLOUDINARY_AUDIO_API } from '../../config/keys'
import { api_key, base, api_secret, audio } from '../../config/keys'
import sha1 from 'sha1'
import qs from 'qs'
import { Z_DATA_ERROR } from 'zlib'
class PaperEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      papers: {
        isloading: true,
        paper: JSON.parse(this.PaperTemplate)
      },
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors })

    if (!isEmpty(nextProps.papers.paper))
      this.setState({ papers: nextProps.papers })
    else {
      this.setState({
        papers: { ...nextProps.papers, paper: JSON.parse(this.PaperTemplate) }
      })
    }
  }

  componentDidMount() {
    if (this.props.match.params.paperId) {
      this.props.getPaperById(
        this.props.match.params.paperId,
        this.props.history
      )
    }
  }

  PaperTemplate = JSON.stringify({
    title: '',
    level: 'CET_4',
    writing: {
      directions: ''
    },
    listening: {
      sections: [
        {
          sectionTitle: '',
          modules: [
            {
              moduleSound: {
                url: ''
              },
              questions: [
                {
                  questionSound: {
                    url: ''
                  },
                  rightAnswer: 0,
                  options: ['', '', '', '']
                }
              ]
            }
          ]
        }
      ]
    },
    translation: {
      question: ''
    }
  })

  sectionTemplate = JSON.stringify({
    sectionTitle: 'NEWS_REPORT',
    modules: [
      {
        moduleSound: {
          url: ''
        },
        questions: [
          {
            questionSound: {
              url: ''
            },
            rightAnswer: 0,
            options: ['', '', '', '']
          }
        ]
      }
    ]
  })

  moduleTemplate = JSON.stringify({
    moduleSound: {
      url: ''
    },
    questions: [
      {
        questionSound: {
          url: ''
        },
        rightAnswer: 0,
        options: ['', '', '', '']
      }
    ]
  })

  questionTemplate = JSON.stringify({
    questionSound: {
      url: ''
    },
    rightAnswer: 0,
    options: ['', '', '', '']
  })

  onSubmit(e) {
    e.preventDefault()

    if (!this.props.match.params.paperId) {
      this.props.createPaper({ ...this.state.papers.paper }, this.props.history)
    } else
      this.props.updatePaper(
        { ...this.state.papers.paper, _id: this.props.match.params.paperId },
        this.props.history
      )
  }

  fileUploadHandler(SelectedFile, papers, paperPath) {
    const [
      listening,
      sections,
      sectionIndex,
      modules,
      moduleIndex,
      moduleField,
      ...moduleChild
    ] = paperPath
    const { paper } = papers
    const timestamp = Date.now()
    const tags = 'listening'
    const folder = 'listening'
    const signature = sha1(
      `${qs.stringify({
        folder,
        tags,
        timestamp
      })}${api_secret}`
    )
    const formData = new FormData()
    formData.append('file', SelectedFile)
    formData.append('folder', folder)
    formData.append('signature', signature)
    formData.append('tags', tags)
    formData.append('timestamp', timestamp)
    formData.append('api_key', api_key)

    const authorization = axios.defaults.headers.common['Authorization']
    delete axios.defaults.headers.common['Authorization']

    axios({
      method: 'POST',
      url: audio,
      data: formData
    })
      .then(res => {
        switch (moduleField) {
          case 'moduleSound':
            paper[listening][sections][sectionIndex][modules][moduleIndex][
              moduleField
            ].url =
              res.data.secure_url
            break
          case 'questions':
            const [questionIndex, questionSound] = moduleChild
            paper[listening][sections][sectionIndex][modules][moduleIndex][
              moduleField
            ][questionIndex][questionSound].url =
              res.data.secure_url
            break
        }
        papers = { ...papers, paper: paper }
        this.setState({ papers: papers })
      })
      .catch(error => {
        console.log(error)
      })

    axios.defaults.headers.common['Authorization'] = authorization
  }

  onChange(e) {
    let [
      valueThis,
      state,
      papers,
      paper,
      part,
      ...partDetail
    ] = e.target.name.split('.')
    papers = this.state.papers

    paper = papers.paper

    let { title, level, writing, listening, translation } = paper

    switch (part) {
      case 'title':
        title = e.target.value || ''
        break
      case 'level':
        level = e.target.value || CET_4
        break
      case 'writing':
        writing = writing || {}
        writing.directions = e.target.value || ''
        break
      case 'listening':
        let [sections, sectionIndex, sectionField, ...sectionChild] = partDetail
        listening = listening || {}
        sections = sections || []
        switch (sectionField) {
          case undefined:
            if (sectionIndex === 'unshift')
              listening[sections].unshift(JSON.parse(this.sectionTemplate))
            break
          case 'insert':
            listening[sections].splice(
              sectionIndex + 1,
              0,
              JSON.parse(this.sectionTemplate)
            )
            break
          case 'delete':
            listening[sections].splice(sectionIndex, 1)
            break
          case 'sectionTitle':
            listening[sections][sectionIndex][sectionField] =
              e.target.value || NEWS_REPORT
            break
          case 'modules':
            const [moduleIndex, moduleField, ...moduleChild] = sectionChild
            switch (moduleField) {
              case undefined:
                if (moduleIndex === 'unshift')
                  listening[sections][[sectionIndex]][sectionField].unshift(
                    JSON.parse(this.moduleTemplate)
                  )
                break
              case 'insert':
                listening[sections][[sectionIndex]][sectionField].splice(
                  moduleIndex + 1,
                  0,
                  JSON.parse(this.moduleTemplate)
                )
                break
              case 'delete':
                listening[sections][[sectionIndex]][sectionField].splice(
                  moduleIndex,
                  1
                )
                break
              case 'moduleSound':
                if (!e.target.files) break
                this.fileUploadHandler(e.target.files[0], papers, [
                  part,
                  ...partDetail
                ])
                break
              case 'questions':
                const [
                  questionIndex,
                  questionField,
                  ...questionChild
                ] = moduleChild
                switch (questionField) {
                  case undefined:
                    if (questionIndex === 'unshift')
                      listening[sections][[sectionIndex]][sectionField][
                        moduleIndex
                      ][moduleField].unshift(JSON.parse(this.questionTemplate))
                    break
                  case 'insert':
                    console.log({ sectionIndex, moduleIndex, questionIndex })
                    listening[sections][[sectionIndex]][sectionField][
                      moduleIndex
                    ][moduleField].splice(
                      questionIndex + 1,
                      0,
                      JSON.parse(this.questionTemplate)
                    )
                    break
                  case 'delete':
                    listening[sections][[sectionIndex]][sectionField][
                      moduleIndex
                    ][moduleField].splice(questionIndex, 1)
                    break
                  case 'questionSound':
                    this.fileUploadHandler(e.target.files[0], papers, [
                      part,
                      ...partDetail
                    ])
                    break
                  case 'options':
                    const [optionIndex] = questionChild
                    listening[sections][sectionIndex][sectionField][
                      moduleIndex
                    ][moduleField][questionIndex][questionField][optionIndex] =
                      e.target.value || ''
                    break
                  case 'rightAnswer':
                    listening[sections][sectionIndex][sectionField][
                      moduleIndex
                    ][moduleField][questionIndex][questionField] =
                      Number(e.target.value) || ''
                    break
                }
                break
            }
        }
        break
      case 'translation':
        translation = translation || {}
        translation.question = e.target.value || ''
        break
    }
    paper = {
      ...this.state.papers.paper,
      title,
      level,
      writing,
      listening,
      translation
    }

    papers = {
      ...papers,
      paper: paper
    }

    this.setState({
      papers: papers
    })
  }

  render() {
    const isCreating = () => isEmpty(this.props.match.params.paperId)
    let { papers, errors } = this.state
    let { paper, loading } = papers
    let { title, level, writing, listening, translation } = paper

    const options = [
      { label: 'CET-4', value: 'CET_4' },
      { label: 'CET-6', value: 'CET_6' }
    ]

    const paperEditorForm = loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmit}>
        <h2>Paper</h2>
        <TextFieldGroup
          title="Title"
          placeholder="Paper Title"
          name="this.state.papers.paper.title"
          value={title}
          onChange={this.onChange}
          error={errors && errors.title && errors.title.message}
        />
        <SelectListGroup
          title="Level"
          placeholder="CET-4"
          name="this.state.papers.paper.level"
          value={level}
          onChange={this.onChange}
          options={options}
          error={errors && errors.level && errors.level.message}
        />
        <h4>Part I Writing</h4>
        <TextAreaFieldGroup
          title="Directions:"
          placeholder="Writing directions"
          name="this.state.papers.paper.writing.directions"
          value={writing.directions}
          onChange={this.onChange}
          error={
            errors &&
            errors['writing.directions'] &&
            errors['writing.directions'].message
          }
        />
        <h4>Part II Listening Comprehension</h4>

        <Listening
          sections={listening.sections}
          onChange={this.onChange}
          errors={errors}
        />
        <h4>Part IV Translation</h4>
        <b>Directions:</b>
        <p>
          For this part, you are allowed 30 minted to translate a passage from
          Chinese into English. You should write your answer on{' '}
          <b>Answer Sheet</b>
        </p>
        <TextAreaFieldGroup
          placeholder="Translation Question"
          name="this.state.papers.paper.translation.question"
          value={translation.question}
          onChange={this.onChange}
          error={
            errors &&
            errors['translation.question'] &&
            errors['translation.question'].message
          }
        />
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
      Listening: PropTypes.shape({
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            sectionTitle: PropTypes.string.isRequired,
            modules: PropTypes.arrayOf(
              PropTypes.shape({
                moduleSound: PropTypes.arrayOf(
                  PropTypes.shape({
                    url: PropTypes.string.isRequired
                  })
                ).isRequired,
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
      }).isRequired,
      translation: PropTypes.shape({
        question: PropTypes.string.isRequired
      }).isRequired
    })
  }).isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  papers: state.papers,
  errors: state.errors
})

export default connect(mapStateToProps, {
  createPaper,
  updatePaper,
  getPaperById
})(withRouter(PaperEditor))
