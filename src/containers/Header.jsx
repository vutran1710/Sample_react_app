import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash/fp'
import { pathToJS, firebaseConnect } from 'react-redux-firebase'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import '../css/header.css'

const Header = ({ firebase: { logout }, auth, routeAfterLogout, activePath }) => {
  const buttonClass = str => activePath.includes(str) ? 'nn-button btn-active' : 'nn-button'
  const navButtonFraction = auth ? 'col-f-1-6 navbar' : 'col-f-1-5 navbar'
  const navContainerClass = !auth ? [
    'col-sm-12 col-md-4 col-lg-6 col-xl-7 shopname-box',
    'col-sm-12 col-md-8 col-lg-6 col-xl-5 content-center navbar-container'
  ] : [
    'col-sm-12 col-md-4 col-lg-4 col-xl-5 col-hd-6 shopname-box',
    'col-sm-12 col-md-8 col-lg-8 col-xl-7 col-hd-6 content-center navbar-container'
  ]
  return (
    <div className="header-top grid-box">
      <div className={navContainerClass[0]}>
        <text className="shopname">ElectroTools</text>
      </div>
      <div className={navContainerClass[1]}>
        <Link to="/home" className={navButtonFraction}>
          <div className={buttonClass('home')}>Home</div>
        </Link>
        <Link to="/shop" className={navButtonFraction}>
          <div className={buttonClass('shop')}>Shop</div>
        </Link>
        <Link to="/cart" className={navButtonFraction}>
          <div className={buttonClass('cart')}>Cart</div>
        </Link>
        <Link to="/about" className={navButtonFraction}>
          <div className={buttonClass('about')}>About</div>
        </Link>
        {auth ? (
          <div className="col-f-1-6 navbar">
            <a
              className="nn-button cursor-pointer"
              onClick={() => logout() && routeAfterLogout()}
              tabIndex={-1}
            >Logout</a>
          </div>
        ) : (
          <Link to="/login" className="col-f-1-5 navbar">
            <div className={buttonClass('login')}>Login</div>
          </Link>
        )}
        {auth && (
          <Link to="/admin" className="col-f-1-6 navbar">
            <div className={buttonClass('admin')}>Admin</div>
          </Link>
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  firebase: PropTypes.any.isRequired,
  auth: PropTypes.any,
  routeAfterLogout: PropTypes.func.isRequired,
  activePath: PropTypes.string.isRequired
}

Header.defaultProps = {
  auth: null
}

export default _.compose(
  connect(
    ({ firebase, routing }) => ({
      auth: pathToJS(firebase, 'auth'),
      activePath: routing.locationBeforeTransitions.pathname
    }),
    dispatch => ({ routeAfterLogout: () => dispatch(push('/home')) })
  ),
  firebaseConnect()
)(Header)
