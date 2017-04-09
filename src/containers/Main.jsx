/* global window */
import React from 'react'
import EasyTransition from 'react-easy-transition'
import Header from './Header'

const Main = ({ children }) => (
  <div>
    <Header />
    <EasyTransition
      path={window.location.pathname}
      initialStyle={{ opacity: 0 }}
      transition="opacity .2s"
      finalStyle={{ opacity: 1 }}
    >
      {children}
    </EasyTransition>
  </div>
)

Main.propTypes = { children: React.PropTypes.any.isRequired }

export default Main
