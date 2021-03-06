import {
  createPaper,
  onPaperEditChange,
  updatePaper,
  getPaperById,
  setPaperEditing,
  fileUploadHandler
} from '../actions/paperActions'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PaperEditor from '../components/paper/PaperEditor'

const mapStateToProps = state => ({
  papers: state.papers,
  errors: state.errors
})

const mapDispatchToProps = {
  createPaper,
  updatePaper,
  getPaperById,
  onPaperEditChange,
  setPaperEditing,
  fileUploadHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(PaperEditor)
)
