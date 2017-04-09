import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './redux/store'
import Main from './containers/Main'
import Login from './containers/Login'
import Shop from './containers/Shop'
import ProductPage from './containers/ProductPage'
import CustomerCart from './containers/CustomerCart'
import Admin from './containers/Admin'
import Banner from './containers/Banner'
import NotFound from './others/NotFound'
import { signedIn } from './utils/auth'

const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main} >
        <IndexRedirect to="/home" />
        <Route path="home" component={Banner} />
        <Route path="shop" component={Shop} />
        <Route path="shop/:id" component={ProductPage} />
        <Route path="cart" component={CustomerCart} />
        <Route path="login" component={Login} onEnter={signedIn('/admin', true)} />
        <Route path="admin" component={Admin} onEnter={signedIn('/page-not-found', false)} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
)

export default App
