import _ from 'lodash/fp'

// Validator for ReduxForm
const keys = ['name', 'manufacturer', 'category', 'spec', 'price', 'image']
const validate = values => _.reduce(
  (errors, key) => (!values[key] || values[key] === '') && _.assign({ [key]: 'Required' }, errors),
  {},
  keys
)

const renderOptionList = products => optionField => _.compose(
  _.sortBy(['value']),
  _.uniqBy('value'),
  _.map(eachProduct => ({ value: eachProduct[optionField], label: eachProduct[optionField] }))
)(products)

const valueOptions = {
  manufacturer: [
    { label: 'Makita', value: 'Makita' },
    { label: 'Bosch', value: 'Bosch' },
    { label: 'Samsung', value: 'Samsung' }
  ],
  category: [
    { label: 'Saw', value: 'Saw' },
    { label: 'Driller', value: 'Driller' },
    { label: 'Screw', value: 'Screw' }
  ],
  sale_otions: [
    { label: 'Not on Sale', value: 0 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
    { label: '30%', value: 30 }
  ],
  availability: [
    { label: 'In Stock', value: true },
    { label: 'Out of Stock', value: false }
  ]
}

const priceRange = [
  { value: '{ "lower": 0, "upper": 500 }', label: '< 500,000 VND' },
  { value: '{ "lower": 500, "upper": 1000 }', label: '500,000 ~ 1,000,000 VND' },
  { value: '{ "lower": 1000, "upper": 2000 }', label: '1,000,000 ~ 2,000,000 VND' },
  { value: '{ "lower": 2000, "upper": 5000 }', label: '2,000,000 ~ 5,000,000 VND' },
  { value: '{ "lower": 5000, "upper": 8000 }', label: '5,000,000 ~ 8,000,000 VND' },
  { value: '{ "lower": 8000, "upper": 15000 }', label: '8,000,000 ~ 15,000,000 VND' },
  { value: '{ "lower": 15000, "upper": 40000 }', label: '> 15,000,000 VND' },
]

const renderCurrency = number => (
  function r(n) {
    if (n.length <= 3) return n.join('')
    return [
      _.takeRight(3, n).join(''),
      r(_.take(n.length - 3, n))
    ].reverse().join()
  }
)(number.toString().split(''))

export { validate, valueOptions, priceRange, renderOptionList, renderCurrency }
