import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deletePaper } from '../../actions/paperActions'
import { Link } from 'react-router-dom'

class PaperIntro extends Component {
  onDeleteClick(paperValue, paperIndex, paperArrays) {
    paperArrays[paperIndex] = { ...paperValue, disabled: true }
    this.props.deletePaper(paperArrays, paperValue._id)
  }

  render() {
    const currentUserPapers = this.props.currentUserPapers.map(
      (paperValue, paperIndex, paperArrays) => (
        <tr key={paperValue._id}>
          <td>
            <Link to={`/paper-editor/${paperValue._id}`}>
              {paperValue.title}
            </Link>{' '}
          </td>
          <td>{paperValue.level}</td>
          <td>
            <Moment format="LLL">{paperValue.date}</Moment>
            {/* {paperValue.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{paperValue.to}</Moment>
          )} */}
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(
                this,
                paperValue,
                paperIndex,
                paperArrays
              )}
              className="btn btn-danger"
              disabled={paperValue.deleting}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    )
    return (
      <div>
        <h4 className="mb-4">Paper Intro</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Date</th>
              <th />
            </tr>
            {currentUserPapers}
          </thead>
        </table>
      </div>
    )
  }
}

PaperIntro.propTypes = {
  deletePaper: PropTypes.func.isRequired
}

export default connect(null, { deletePaper })(PaperIntro)
