import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      nickname: '',
      email: '',
      password: '',
      passwordComfirmed: '',
      errors: {},
    }
  }

  async onSubmit(e) {
    e.preventDefault()
    this.props.registerUser(this.state)
    // try {
    //   const res = await axios.post('api/users/', this.state)
    //   console.log(res.data)
    // } catch (error) {
    //   this.setState({ errors: error.response.data })
    //   console.log(error.response.data)
    // }
  }

  onChange(e) {
    this.setState({ errors: { ...this.state.errors, [e.target.name]: null } })
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    const { user } = this.props.auth

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your CETutor account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.nickname,
                    })}
                    placeholder="Nickname"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  {errors.nickname && (
                    <div className="invalid-feedback">{errors.nickname}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  {/* <small classNameName="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small> */}
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.passwordComfirmed,
                    })}
                    placeholder="Confirm Password"
                    name="passwordComfirmed"
                    value={this.state.passwordComfirmed}
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  {errors.passwordComfirmed && (
                    <div className="invalid-feedback">
                      {errors.passwordComfirmed}
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { registerUser })(Register)
