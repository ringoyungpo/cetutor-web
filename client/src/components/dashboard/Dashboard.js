import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import PaperIntro from '../../components/paper/PaperIntro'
import DashActionBar from './DashActionBar'
export default class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUserPapers()
  }

  render() {
    const { user } = this.props.auth
    const { currentUserPapers, loading } = this.props.papers

    let dashboardContent

    if (currentUserPapers === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check if logged in user has profile dataDELETE_PAPERS
      if (currentUserPapers.length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
              Welcome {user.nickname}
            </p>
            <DashActionBar />
            {/* <ProfileActions /> */}
            {/* <Experience experience={profile.experience} />
            <Education education={profile.education} /> */}
            <PaperIntro
              currentUserPapers={currentUserPapers}
              deletePaper={this.props.deletePaper}
            />
            <div style={{ marginBottom: '60px' }} />
            {/* <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
          </div>
        )
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.nickname}</p>
            <p>You have not yet create a paper, would you like to make one?</p>
            <Link to="/paper-editor" className="btn btn-lg btn-info">
              Create Paper
            </Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashsdboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentUserPapers: PropTypes.func.isRequired,
  // deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  papers: PropTypes.object.isRequired
}
