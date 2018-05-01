import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deletePaper } from '../../actions/paperActions'

class PaperIntro extends Component {
  onDeleteClick(id) {
    this.props.deletePaper(id)
  }

  render() {
    const currentUserPapers = this.props.currentUserPapers.map(paperValue => (
      <tr key={paperValue._id}>
        <td>{paperValue.title}</td>
        <td>{paperValue.level}</td>
        <td>
          <Moment format="YYYY/MM/DD">{paperValue.date}</Moment>
          {/* {paperValue.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{paperValue.to}</Moment>
          )} */}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, paperValue._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
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
  deletePaper: PropTypes.func.isRequired,
}

export default connect(null, { deletePaper })(PaperIntro)
