import { connect } from 'react-redux'
import {
  loginUser,
  onLoginInputChange,
  loginIntial
} from '../actions/authActions'
import LoginInput from '../components/auth/LoginInput'

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginInput: state.auth.loginInput,
  errors: state.errors,
  spinner: state.spinner
})

const mapDispatchToProps = {
  loginUser,
  onLoginInputChange,
  loginIntial
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginInput)
