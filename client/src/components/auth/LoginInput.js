import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import Spinner from '../common/Spinner'

export default class LoginInput extends Component {
  componentWillMount() {
    this.props.loginIntial()
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.loginUser(this.props.loginInput)
  }

  render() {
    const { errors } = this.props
    const { submitting } = this.props.spinner
    const { email, password } = this.props.loginInput
    // console.log

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your CETutor account
              </p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.props.onLoginInputChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.props.onLoginInputChange}
                  error={errors.password}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  disabled={submitting}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginInput.propTypes = {
  loginUser: PropTypes.func.isRequired,
  onLoginInputChange: PropTypes.func.isRequired,
  loginIntial: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginInput: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  errors: PropTypes.object.isRequired,
  spinner: PropTypes.object.isRequired
}
