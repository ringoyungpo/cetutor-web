import { connect } from 'react-redux'
import {
  registerUser,
  authIntial,
  onRegisterInputChange
} from '../actions/authActions'
import { withRouter } from 'react-router-dom'
import RegisterInput from '../components/auth/RegisterInput'

const mapStateToProps = state => ({
  registerInput: state.auth.registerInput,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
})

const mapDispatchToProps = {
  registerUser,
  authIntial,
  onRegisterInputChange
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(RegisterInput)
)
