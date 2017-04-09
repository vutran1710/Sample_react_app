import React from 'react'
import { connect } from 'react-redux'
import { renderCurrency } from '../utils/category'
import { removeItem } from '../redux/reducer'

class CustomerCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeProduct: null }
  }

  static propTypes = {
    cartitems: React.PropTypes.any
  }

  static defaultProps = {
    cartitems: null
  }

  render() {
    const { cartitems, removeItem, totalpay } = this.props
    const prd = this.state.activeProduct
    const removeItemAndResetState = item => {
      removeItem(item)
      this.setState({ activeProduct: null })
    }
    return (
      <div className="cart-container">
        <div className="col-sm-12 col-md-7 cartlist -left">
          {cartitems.length === 0 ? (
            <h3 className="content-center">Your cart is now empty! :)</h3>
          ) : (
              <div className="flow-container">
                {cartitems && cartitems.map((f, i) => (
                  <div
                    key={f.key}
                    className={i % 2 === 0 ? 'rowlist even relative' : 'rowlist odd relative'}
                    onMouseEnter={() => this.setState({ activeProduct: f })}
                  >
                    <h4 className="ma-0">{f.name}</h4>
                    <h4 className="ma-0">{f.key}</h4>
                    <h4 className="ma-0">{f.price}</h4>
                    <button
                      onClick={() => removeItemAndResetState(f)} type="button"
                      className="absolute"
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
        <div className="col-sm-12 col-md-5 cartlist -right">
          <h4 className="mt-1 mb-1 content-center hidden-sm">Product Details</h4>
          {prd && (
            <div className="container">
              <h5 className="ma-0">{prd.name}</h5>
            </div>
          )}
          <div className="row red">
            <h4 className="content-center">
              Total worth:&nbsp;{renderCurrency(totalpay*1000)}&nbsp;VND
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ addItem }) => ({
    cartitems: addItem.cartitems,
    totalpay: Math.floor(addItem.cartitems.reduce((total, item) => total + item.price * (1 - item.sale/100), 0))
  }),
  ({ removeItem })
)(CustomerCart)
