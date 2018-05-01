import React from 'react'
import { Link } from 'react-router-dom'

const DashActionBar = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/paper-editor" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Paper
      </Link>
    </div>
  )
}

export default DashActionBar
