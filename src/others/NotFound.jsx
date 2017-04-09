import React from 'react'
import { withRouter } from 'react-router'
import gears from '../images/gears.svg'

const NotFound = ({ router }) => (
  <div className="container content-center">
    <h2 className="mt-5 mb-5 grey">
      Oops! There is no such page!
    </h2>
    <img src={gears} alt="page-not-found" className="not-found-animation mb-5" />
    <div className="row text-center">
      <button
        className="btn hvr-sweep-to-right"
        onClick={() => router.push('/')}
        style={{ width: '7rem' }}
      >
        Go Back
      </button>
    </div>
  </div>
)

NotFound.propTypes = {
  router: React.PropTypes.any.isRequired
}

export default withRouter(NotFound)
