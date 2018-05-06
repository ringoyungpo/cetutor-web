import { connect } from 'react-redux'
import PrivateRoute from '../components/common/PrivateRoute'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
