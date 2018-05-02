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
import { CET_4, CET_6 } from '../../constant/paperConst'

class PaperEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isloading: true,
      paper: {
        translation: {
          question: ''
        },
        listening: {
          sections: [
            {
              directions: 'sdfsdfasadsf',
              sectionTitle: 'jkjdfkjdf',
              modules: [
                {
                  moduleTitle: '1Questions are based on what you have heard?',
                  moduleSound: {
                    url:
                      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
                    status: 2
                  },
                  questions: [
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    }
                  ]
                }
              ]
            },
            {
              directions: 'sdfsdfasadsf',
              sectionTitle: 'jkjdfkjdf',
              modules: [
                {
                  moduleTitle: '1Questions are based on what you have heard?',
                  moduleSound: {
                    url:
                      'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
                    status: 2
                  },
                  questions: [
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    },
                    {
                      questionSound: {
                        url:
                          'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3'
                      },
                      rightAnswer: 0,
                      optionSelected: null,
                      options: [
                        '1The news report mainly about A?',
                        '1The news report mainly about B?',
                        '1The news report mainly about C?',
                        '1The news report mainly about D?'
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        writing: {
          directions: ''
        },
        level: CET_6,
        title: ''
      },
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors.errors })

    if (nextProps.papers) this.setState({ ...nextProps.papers })
  }

  componentDidMount() {
    if (this.props.match.params.paperId) {
      this.props.getPaperById(
        this.props.match.params.paperId,
        this.props.history
      )
    }
  }

  onSubmit(e) {
    e.preventDefault()

    //   const profileData = {
    //     handle: this.state.handle,
    //     company: this.state.company,
    //     website: this.state.website,
    //     location: this.state.location,
    //     status: this.state.status,
    //     skills: this.state.skills,
    //     githubusername: this.state.githubusername,
    //     bio: this.state.bio,
    //     twitter: this.state.twitter,
    //     facebook: this.state.facebook,
    //     linkedin: this.state.linkedin,
    //     youtube: this.state.youtube,
    //     instagram: this.state.instagram,
    //   }

    if (!this.props.match.params.paperId)
      this.props.createPaper(this.state.paper, this.props.history)
    else
      this.props.updatePaper(
        { ...this.state.paper, _id: this.props.match.params.paperId },
        this.props.history
      )
  }

  onChange(e) {
    let [valueThis, state, paper, part, ...partDetail] = e.target.name.split(
      '.'
    )
    paper = this.state.paper

    let { writing, listening, translation } = paper

    switch (part) {
      case 'title':
        paper.title = e.target.value || ''
        break
      case 'level':
        paper.level = e.target.value || CET_6
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
          case 'directions':
          case 'sectionTitle':
            listening[sections][sectionIndex][sectionField] =
              e.target.value || ''
            break
          case 'modules':
            const [moduleIndex, moduleField, ...moduleChild] = sectionChild
            switch (moduleField) {
              case 'moduleTitle':
                listening[sections][sectionIndex][sectionField][moduleIndex][
                  moduleField
                ] =
                  e.target.value || ''
                break
              case 'questions':
                const [
                  questionIndex,
                  questionField,
                  ...questionChild
                ] = moduleChild
                switch (questionField) {
                  case 'options':
                    const [optionIndex] = questionChild
                    listening[sections][sectionIndex][sectionField][
                      moduleIndex
                    ][moduleField][questionIndex][questionField][optionIndex] =
                      e.target.value || ''
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
      writing,
      listening,
      translation,
      ...this.state.paper
    }

    this.setState({
      paper: paper
    })
  }

  render() {
    const isCreating = () => isEmpty(this.props.match.params.paperId)
    let { paper, loading, errors } = this.state
    let { title, level, writing, listening, translation } = paper || {}

    const options = [
      { label: 'CET-4', value: 'CET_4' },
      { label: 'CET-6', value: 'CET_6' }
    ]

    // let socialInputs

    // if (displaySocialInputs) {
    //   socialInputs = (
    //     <div>
    //       <InputGroup
    //         placeholder="Twitter Profile URL"
    //         name="twitter"
    //         icon="fab fa-twitter"
    //         value={this.state.twitter}
    //         onChange={this.onChange}
    //          error={errors&&errors.twitter}
    //       />

    //       <InputGroup
    //         placeholder="Facebook Page URL"
    //         name="facebook"
    //         icon="fab fa-facebook"
    //         value={this.state.facebook}
    //         onChange={this.onChange}
    //          error={errors&&errors.facebook}
    //       />

    //       <InputGroup
    //         placeholder="Linkedin Profile URL"
    //         name="linkedin"
    //         icon="fab fa-linkedin"
    //         value={this.state.linkedin}
    //         onChange={this.onChange}
    //          error={errors&&errors.linkedin}
    //       />

    //       <InputGroup
    //         placeholder="YouTube Channel URL"
    //         name="youtube"
    //         icon="fab fa-youtube"
    //         value={this.state.youtube}
    //         onChange={this.onChange}
    //          error={errors&&errors.youtube}
    //       />

    //       <InputGroup
    //         placeholder="Instagram Page URL"
    //         name="instagram"
    //         icon="fab fa-instagram"
    //         value={this.state.instagram}
    //         onChange={this.onChange}
    //          error={errors&&errors.instagram}
    //       />
    //     </div>
    //   )
    // }

    // Select options for status
    const paperEditorForm = loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.onSubmit}>
        <h2>
          {JSON.stringify(
            errors && errors.writing
            // &&errors.writing.directions &&
            // errors.writing.directions.message
          )}
        </h2>

        <h2>Paper</h2>
        <TextFieldGroup
          title="Title"
          placeholder="Paper Title"
          name="this.state.paper.title"
          value={title}
          onChange={this.onChange}
          error={errors && errors.title && errors.title.message}
        />
        <SelectListGroup
          title="Level"
          placeholder="CET-?"
          name="this.state.paper.level"
          value={level}
          onChange={this.onChange}
          options={options}
          error={errors && errors.level && errors.level.message}
        />
        <h4>Part I Writing</h4>
        <TextAreaFieldGroup
          title="Directions:"
          placeholder="Writing directions"
          name="this.state.paper.writing.directions"
          value={writing && writing.directions}
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
          placeholder="Translation Directions"
          name="this.state.paper.translation.question"
          value={translation && translation.question}
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
                Let's get some information to make your question completed
              </p>
              {paperEditorForm}

              {/* <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                   error={errors&&errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                   error={errors&&errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                   error={errors&&errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                   error={errors&&errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                   error={errors&&errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                   error={errors&&errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                   error={errors&&errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }))
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PaperEditor.propTypes = {
  papers: PropTypes.object.isRequired,
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
