import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createPaper } from '../../actions/paperActions'

class PaperEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paper: {
        translation: {
          question: 'Patsddffh `translation.question` is required',
        },
        writing: {
          dirctions: 'Patasdfh `writing.dirctions` is required',
        },
        level: 'CET_4',
        title: 'Paadsfth `title` is required',
      },
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
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

    this.props.createPaper(this.state.paper, this.props.history)
  }

  onChange(e) {
    let [valueThis, state, paper, part, partDetail] = e.target.name.split('.')
    paper = this.state.paper
    switch (part) {
      case 'level':
        paper.level = e.target.value
        break
      case 'writing':
        paper.writing.dirctions = e.target.value
        break
      case 'translation':
        paper.translation.question = e.target.value
        break
    }
    this.setState({ paper: paper })
  }

  render() {
    const { errors, paper } = this.state

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
    //         error={errors.twitter}
    //       />

    //       <InputGroup
    //         placeholder="Facebook Page URL"
    //         name="facebook"
    //         icon="fab fa-facebook"
    //         value={this.state.facebook}
    //         onChange={this.onChange}
    //         error={errors.facebook}
    //       />

    //       <InputGroup
    //         placeholder="Linkedin Profile URL"
    //         name="linkedin"
    //         icon="fab fa-linkedin"
    //         value={this.state.linkedin}
    //         onChange={this.onChange}
    //         error={errors.linkedin}
    //       />

    //       <InputGroup
    //         placeholder="YouTube Channel URL"
    //         name="youtube"
    //         icon="fab fa-youtube"
    //         value={this.state.youtube}
    //         onChange={this.onChange}
    //         error={errors.youtube}
    //       />

    //       <InputGroup
    //         placeholder="Instagram Page URL"
    //         name="instagram"
    //         icon="fab fa-instagram"
    //         value={this.state.instagram}
    //         onChange={this.onChange}
    //         error={errors.instagram}
    //       />
    //     </div>
    //   )
    // }

    // Select options for status
    const options = [
      { label: 'CET-?', value: 0 },
      { label: 'CET-4', value: 'CET_4' },
      { label: 'CET-6', value: 'CET-6' },
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Paper</h1>
              <p className="lead text-center">
                Let's get some information to make your question completed
              </p>
              <form onSubmit={this.onSubmit}>
                <h2>Paper</h2>
                <TextFieldGroup
                  title="Title"
                  placeholder="Paper Title"
                  name="this.state.paper.title"
                  value={this.state.paper.title}
                  onChange={this.onChange}
                  error={errors.handle}
                />

                <SelectListGroup
                  title="Level"
                  placeholder="CET-?"
                  name="this.state.paper.level"
                  value={this.state.paper.level}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />

                <h4>Part I Writting</h4>
                <TextFieldGroup
                  title="Directions:"
                  placeholder="Writting Dirctions"
                  name="this.state.paper.writing.dirctions"
                  value={this.state.paper.writing.dirctions}
                  onChange={this.onChange}
                  error={errors.handle}
                />

                <h4>Part IV Translation</h4>
                <b>Directions:</b>
                <p>
                  For this part, you are allowed 30 minted to translate a
                  passage from Chinese into English. You should write your
                  answer on <b>Answer Sheet</b>
                </p>
                <TextFieldGroup
                  placeholder="Tran Dirctions"
                  name="this.state.paper.translation.question"
                  value={this.state.paper.translation.question}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                {/* <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PaperEditor.propTypes = {
  papers: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  papers: state.papers,
  errors: state.errors,
})

export default connect(mapStateToProps, { createPaper })(
  withRouter(PaperEditor),
)
