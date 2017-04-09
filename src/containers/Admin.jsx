import React from 'react'
import { connect } from 'react-redux'
import { firebaseConnect, orderedToJS, isLoaded } from 'react-redux-firebase'
import _ from 'lodash/fp'
import api from '../api'
import { renderOptionList } from '../utils/category'
import AddProductForm from '../components/AddProductForm'
import LoadingPrompt from '../others/LoadingPrompt'

const Admin = ({ products }) => {
  if (!isLoaded(products)) return <LoadingPrompt />
  return (
    <div>
      <h3 className="content-center mt-5">Welcome back, Admin!</h3>
      <div className="col-sm-12">
        <h4 className="content-center">Add new product</h4>
        <AddProductForm optionList={renderOptionList(products)} />
      </div>
    </div>
  )
}

Admin.propTypes = { products: React.PropTypes.any }

Admin.defaultProps = { products: [] }

export default _.compose(
  connect(
    ({ firebase }) => ({ products: orderedToJS(firebase, api.database) }),
  ),
  firebaseConnect([api.database])
)(Admin)
