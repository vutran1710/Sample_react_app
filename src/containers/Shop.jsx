import React from 'react'
import { connect } from 'react-redux'
import { Fields, reduxForm } from 'redux-form'
import { firebaseConnect, isLoaded, isEmpty, orderedToJS } from 'react-redux-firebase'
import _ from 'lodash/fp'
import api from '../api'
import { addItem } from '../redux/reducer'
import { priceRange, renderOptionList } from '../utils/category'
import ShopFilter from '../components/ShopFilter'
import ProductItem from '../components/ProductItem'
import LoadingPrompt from '../others/LoadingPrompt'

const filterArray = ['price', 'name', 'sale', 'manufacturer', 'category', 'availability']
const filterHelper = product => ({
  price: range => {
    const rg = JSON.parse(range)
    const { price } = product
    return price > rg.lower && price <= rg.upper
  },
  name: str => product.name.toLowerCase().includes(str.toLowerCase()),
  sale: value => value === 'all' ? (product.sale > 0) : (product.sale === value),
  manufacturer: mf_array => mf_array.includes(product.manufacturer),
  category: ct_array => ct_array.includes(product.category),
  availability: bol => bol ? product.availability : true
})

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showFilter: false, notify: false }
  }

  static propTypes = {
    products: React.PropTypes.array,
    addItem: React.PropTypes.any
  }

  static defaultProps = {
    products: [],
    addItem: ''
  }

  toggleFilter = e => this.setState({ showFilter: !this.state.showFilter })

  render() {
    const { products, addItem, inCart } = this.props
    if (!isLoaded(products) || isEmpty(products)) return <LoadingPrompt />
    return (
      <form className="grid-box shopform">
        <div className="hidden-sm col-md-3 sidebar">
          <div className="grid-box -filter">
            <ShopFilter optionList={renderOptionList(products)} fieldClass="col-sm-6 col-md-12" />
          </div>
        </div>
        <div className="col-sm-12 col-md-9 catalogue">
          <div className="hidden-md hidden-lg hidden-xl col-sm-12">
            <div className="grid-box -filter mt-1">
              {this.state.showFilter && <ShopFilter optionList={renderOptionList(products)} fieldClass="col-sm-6 col-md-12" />}
              <h4 className="content-center mt-1 mb-2">
                <button onClick={this.toggleFilter} type="button" className="btn-reset">
                  <i className="fa fa-search white" />
                </button>
              </h4>
            </div>
          </div>
          <Fields
            names={filterArray}
            component={p => {
              const filteredList = _.filter(product => _.every(
                key => {
                  if (
                    p[key].meta.pristine ||
                    p[key].input.value === '' ||
                    p[key].input.value.length === 0
                  ) return true
                  return filterHelper(product)[key](p[key].input.value)
                }, filterArray
              ), products)
              return (
                <div className="product-container">
                  {filteredList.map((f, i) => (
                    <ProductItem
                      product={f}
                      key={f.key}
                      addItemToCart={() => addItem(f)}
                      disabledAddCart={!_.find({ key: f.key}, inCart)}
                    />
                  ))}
                </div>
              )
            }}
          />
        </div>
      </form>
    )
  }
}

export default _.compose(
  connect(
    ({ firebase, addItem }) => ({
      products: orderedToJS(firebase, api.database),
      inCart: addItem.cartitems
    }),
    ({ addItem })
  ),
  reduxForm({
    form: 'filterForm',
    initialValues: ({ availability: false })
  }),
  firebaseConnect([api.database])
)(Shop)
