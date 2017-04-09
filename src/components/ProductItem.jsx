/* global window */
import React from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'
import { renderCurrency } from '../utils/category'
import saleb from '../images/saleb.svg'

const displayPrice = (prc, sal) => {
  if (sal === 0) {
    return <span className="text-success">{`${renderCurrency(prc * 1000)} VND`}</span>
  }
  const newprice = Math.round(prc * (100 - sal) / 100)
  return (
    <div>
      <span className="price-obsolete"><del>{renderCurrency(prc * 1000)}</del></span><br />
      <span>{`${renderCurrency(newprice * 1000)} VND`}</span>&nbsp;
    </div>
  )
}

const PlaceholderComponent = () => (
  <img
    src="/preloader.gif"
    alt="placeholder"
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: '20%',
      boxSizing: 'border-box',
    }}
  />
)

const ProductItem = p => {
  const {
    product: { key, name, image, manufacturer, price, sale, availability },
    addItemToCart, disabledAddCart
  } = p
  const addButtonTitle = () => {
    if (!availability) return 'Out of Stock'
    if (!disabledAddCart) return 'Added!'
    return <div>Quick Add <i className="fa fa-plus" /></div>
  }
  return (
    <div className="col-sm-6 col-md-4 col-xl-3 product-grid">
      {sale > 0 && (
        <span className="sale-danger">
          <img src={saleb} alt={sale} />
          <text>{`${sale}%`}</text>
        </span>
      )}
      <Link to={`/shop/${key}`} className="linkwrap">
        <div className="productoverlay">
          <LazyLoad height={'100%'} offset={-80} placeholder={<PlaceholderComponent />} overflow>
            <img src={image} alt={name} />
          </LazyLoad>
          <div className="info">
            <div className="row pb-1">
              {name} <br /> {manufacturer} <br /> {displayPrice(price, sale)}
            </div>
          </div>
        </div>
      </Link>
      <button
        className="btn-reset quickadd"
        onClick={() => addItemToCart()} type="button"
        disabled={!availability || !disabledAddCart}
      >{addButtonTitle()}</button>
    </div>
  )
}

export default ProductItem
