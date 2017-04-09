import React from 'react'
import { Field } from 'redux-form'
import { Selector, Input } from './FormInputs'
import { valueOptions as op, priceRange } from '../utils/category'

const ShopFilter = ({ optionList, fieldClass }) => (
  <div>
    <div className={fieldClass}>
      <Field
        name="name"
        component={Input}
        placeholder="Search by product name"
      />
    </div>
    <div className={fieldClass}>
      <Field
        component={Selector}
        name="manufacturer"
        options={optionList('manufacturer')}
        placeholder="Search by manufacturer"
        className="form-control"
        clearable
        multi
      />
    </div>
    <div className={fieldClass}>
      <Field
        component={Selector}
        name="sale"
        options={op.sale_otions.concat([{ value: 'all', label: 'All sale products' }])}
        placeholder="Search of products on sale"
        clearable
      />
    </div>
    <div className={fieldClass}>
      <Field
        component={Selector}
        name="category"
        options={optionList('category')}
        placeholder="Filter by category"
        clearable
        multi
      />
    </div>
    <div className={fieldClass}>
      <Field
        component={Selector}
        name="price"
        options={priceRange}
        placeholder="Filter by price"
        clearable
      />
    </div>
    <div className={fieldClass}>
      <Field
        component={Selector}
        name="availability"
        clearable={false}
        options={[
          { value: true, label: 'Available only' },
          { value: false, label: 'All Product' }
        ]}
      />
    </div>
  </div>
)

ShopFilter.propTypes = {
  optionList: React.PropTypes.any.isRequired,
  fieldClass: React.PropTypes.string.isRequired
}

export default ShopFilter
