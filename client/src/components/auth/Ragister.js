import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  registerUser,
  authIntial,
  onRegisterInputChange
} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
  componentWillMount() {
    this.props.authIntial()
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.registerUser(this.props.registerInput, this.props.history)
  }

  render() {
    const { errors, registerInput, onRegisterInputChange } = this.props
    const { nickname, email, password, passwordComfirmed } = registerInput

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="nickname"
                  name="nickname"
                  value={nickname}
                  onChange={onRegisterInputChange}
                  error={errors.nickname}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onRegisterInputChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onRegisterInputChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="passwordComfirmed"
                  type="password"
                  value={passwordComfirmed}
                  onChange={onRegisterInputChange}
                  error={errors.passwordComfirmed}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  registerInput: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordComfirmed: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  registerInput: state.auth.registerInput,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
})

export default connect(mapStateToProps, {
  registerUser,
  authIntial,
  onRegisterInputChange
})(withRouter(Register))
