import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { firebaseConnect, pathToJS } from 'react-redux-firebase'
import _ from 'lodash/fp'
import { authErrorMessage } from '../utils/auth'

const renderAuthMessage = rejected => authErrorMessage.find(f => f.value === rejected.code).label

const Login = ({ firebase: { login }, authError, routeAfterLogin }) => {
  const signIn = credentials => login(credentials).then(routeAfterLogin)
  const handleLogin = e => {
    e.preventDefault()
    const credentials = {
      email: e.target.childNodes[1].value,
      password: e.target.childNodes[3].value
    }
    signIn(credentials)
  }
  return (
    <div className="container mt-5">
      <div className="grid-box">
        <form
          onSubmit={handleLogin}
          className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4"
        >
          <label htmlFor="usermail" className="form-control font-16">User Name</label>
          <input type="text" className="form-control" />
          <label htmlFor="password" className="form-control font-16">Password</label>
          <input type="password" className="form-control" />
          <button type="submit" className="btn hvr-sweep-to-right float-right">Login</button>
          <div className="clearfix mb-3" />
          <div className="mt-1 grid-box p-relative content-center">
            {authError && <h4 className="m-t-1 text-danger">{renderAuthMessage(authError)}</h4>}
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  firebase: PropTypes.any.isRequired,
  routeAfterLogin: PropTypes.func.isRequired,
  authError: PropTypes.any
}

Login.defaultProps = {
  authError: null
}

export default _.compose(
  connect(
    ({ firebase }) => ({ authError: pathToJS(firebase, 'authError') }),
    dispatch => ({ routeAfterLogin: token => typeof token === 'string' && dispatch(push('/admin')) })
  ),
  firebaseConnect()
)(Login)
