import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import { Link } from 'react-router-dom'

const PaperIntro = ({ currentUserPapers, deletePaper }) => {
  const onDeleteClick = (paperValue, paperIndex, paperArrays) => {
    paperArrays[paperIndex] = { ...paperValue, disabled: true }
    deletePaper(paperArrays, paperValue._id)
  }

  const currentUserPapersView = currentUserPapers.map(
    (paperValue, paperIndex, paperArrays) => (
      <tr key={paperValue._id}>
        <td>
          <Link to={`/paper-editor/${paperValue._id}`}>{paperValue.title}</Link>{' '}
        </td>
        <td>{paperValue.level}</td>
        <td>
          <Moment format="LLL">{paperValue.date}</Moment>
        </td>
        <td>
          <button
            onClick={() => {
              onDeleteClick(paperValue, paperIndex, paperArrays)
            }}
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
          {currentUserPapersView}
        </thead>
      </table>
    </div>
  )
}

PaperIntro.propTypes = {
  currentUserPapers: PropTypes.object.isRequired,
  deletePaper: PropTypes.func.isRequired
}

export default PaperIntro
