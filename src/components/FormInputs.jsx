import React from 'react'
import Select, { Creatable } from 'react-select'

const Input = ({ meta: { touched, error }, input, ...rest }) => (
  <input
    {...input} {...rest}
    className={`form-control ${touched && error && '-hasError'}`}
  />
)

Input.propTypes = {
  meta: React.PropTypes.object.isRequired,
  input: React.PropTypes.object.isRequired
}

const Textarea = ({ meta: { touched, error }, input, ...rest }) => (
  <textarea
    {...input} {...rest}
    className={`form-control ${touched && error && '-hasError'}`}
  />
)

Textarea.propTypes = {
  meta: React.PropTypes.object.isRequired,
  input: React.PropTypes.object.isRequired
}

const updateNewValue = onChange => vals => onChange(vals && vals.value)

const returnNewValue = vals => vals && ({ label: vals, value: vals })

const optionObjectToArray = onChange => value => onChange(
  value.length > 0 ? (
    value.reduce((array, object) => array.concat([object.value]), [])
  ) : []
)

const multiSelect_ReturnValue = value => value && value.map(e => ({ value: e, label: e }))

const Selector = ({
  meta: { touched, error },
  input: { value, onChange, onBlur },
  ...rest
}) => rest.creatable ? (
  <Creatable
    {...rest}
    onBlur={() => onBlur()}
    onChange={updateNewValue(onChange)}
    value={returnNewValue(value)}
    className={`${touched && error && '-hasError'}`}
  />
) : (!rest.multi ? (
  <Select
    {...rest}
    onChange={updateNewValue(onChange)}
    value={value}
    className={`${touched && error && '-hasError'}`}
  />
) : (
  <Select
    {...rest}
    onChange={optionObjectToArray(onChange)}
    value={multiSelect_ReturnValue(value)}
    className={`${touched && error && '-hasError'}`}
  />
))

Selector.propTypes = {
  input: React.PropTypes.any.isRequired,
  meta: React.PropTypes.any.isRequired,
  creatable: React.PropTypes.bool
}

Selector.defaultProps = {
  creatable: false
}

export { Selector, Input, Textarea }
