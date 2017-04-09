import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import _ from 'lodash/fp'

// Additional actions and reducers

// Show/Hide Filter
const TOGGLE_FILTER = 'TOGGLE_FILTER'
export const toggleFilter = () => ({ type: TOGGLE_FILTER })
const toggleFilterReducer = (state = [], action) => action.type === TOGGLE_FILTER ?
  ({ ...state, showFilter: !state.showFilter }) : state

// Add/Remove Item to Cart
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const addItem = item => (dispatch, getState) => new Promise(res => {
  const before = getState().addItem.cartitems.length
  dispatch({ type: ADD_ITEM, item })
  const after = getState().addItem.cartitems.length
  return res(before < after)
})

export const removeItem = item => ({ type: REMOVE_ITEM, item })

const addItemReducer = (state = { cartitems: [] }, action) => {
  if (!action.item) return state
  if (action.type === ADD_ITEM) {
    if (!action.item.availability) return state
    if (_.find({ key: action.item.key }, state.cartitems)) return state
    return ({ ...state, cartitems: state.cartitems.concat([action.item]) })
  } else if (action.type === REMOVE_ITEM) {
    return ({ ...state, cartitems: _.reject({ key: action.item.key }, state.cartitems) })
  }
}

export default combineReducers({
  firebase: firebaseStateReducer,
  routing: routerReducer,
  form: formReducer,
  toggleFilter: toggleFilterReducer,
  addItem: addItemReducer
})
