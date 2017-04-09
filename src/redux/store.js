/* global window */
import { createStore, compose, applyMiddleware } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { fbConfig, userConfig } from '../config'

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer, {},
  composer(
    reactReduxFirebase(fbConfig, userConfig),
    applyMiddleware(routerMiddleware(browserHistory), thunk),
  )
)
