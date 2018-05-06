import { getCurrentUserPapers, deletePaper } from '../actions/paperActions'
import Dashboard from '../components/dashboard/Dashboard'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  papers: state.papers,
  auth: state.auth
})

const mapDispatchToProps = { deletePaper, getCurrentUserPapers }
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
