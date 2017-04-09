import React, { PropTypes } from 'react'
import { dataToJS, isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import _ from 'lodash/fp'
import LoadingPrompt from '../others/LoadingPrompt'
import api from '../api'
import { addItem } from '../redux/reducer'
import { renderCurrency } from '../utils/category'
import '../css/productdetail.css'

class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notify: false }
  }

  render() {
    const { product, addItem, routeParams, disabledAddCart } = this.props
    if (!isLoaded(product) || isEmpty(product)) return <LoadingPrompt />
    const addButtonTitle = () => {
      if (!product.availability) return 'Unavailable'
      if (!disabledAddCart) return 'Added!'
      return 'Add to Cart'
    }
    const disable = !product.availability || !disabledAddCart
    const addItemButton = () => (
      <a
        onClick={() => addItem({ ...product, key: routeParams.id })}
        className={`btn-reset ${!disable ? 'hvr-sweep-to-right cursor-pointer' : 'disabled'}`}
      >{addButtonTitle()}
      </a>
    )
    return (
      <div className="container mt-5 detailform">
        <div className="col-sm-12 col-md-5 col-xl-4 content-left">
          <img src={product.image} alt={product.name} className="detailpic" />
        </div>
        <div className="hidden-sm divider" />
        <div className="col-sm-12 col-md-6">
          <div className="row content-left title mb-1">{product.name}</div>
          <hr />
          <ul className="detaillist">
            <li>{product.manufacturer}</li>
            <li>{product.category}</li>
            <li className="specli">{product.spec}</li>
            <li>Price:&nbsp;{renderCurrency(product.price * 1000)}&nbsp;VND</li>
          </ul>
          {addItemButton(product.availability)}
          <Link to="/shop" className="btn-reset hvr-sweep-to-right">Go back</Link>
          <Link to="/cart" className="btn-reset hvr-sweep-to-right">Checkout</Link>
        </div>
      </div>
    )
  }
}

ProductPage.propTypes = {
  product: PropTypes.object,
  addItem: PropTypes.func.isRequired,
  routeParams: PropTypes.any.isRequired,
  disabledAddCart: PropTypes.bool.isRequired
}

ProductPage.defaultProps = { product: null }

export default _.compose(
  connect(
    (state, ownProps) => ({
      product: dataToJS(state.firebase, `${api.database}${'/'}${ownProps.params.id}`),
      disabledAddCart: !_.find({ key: ownProps.params.id }, state.addItem.cartitems)
    }),
    ({ addItem })
  ),
  firebaseConnect([api.database])
)(ProductPage)
