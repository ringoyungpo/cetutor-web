import { connect } from 'react-redux'
import { logoutUser } from '../actions/authActions'
import { clearCurrentPaper } from '../actions/paperActions'
import Navbar from '../components/layout/Navbar'

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  logoutUser,
  clearCurrentPaper
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
