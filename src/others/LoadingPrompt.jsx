import React from 'react'
import gears from '../images/gears.svg'

const LoadingPrompt = () => (
  <div className="container content-center">
    <h2 className="mt-5 mb-5 grey">
      Please wait...
    </h2>
    <img src={gears} alt="page-not-found" className="not-found-animation mb-5" />
  </div>
)

export default LoadingPrompt
