import React from 'react'
import { getFirebase } from 'react-redux-firebase'
import { Field, reduxForm, SubmissionError, propTypes } from 'redux-form'
import { Selector, Input, Textarea } from './FormInputs'
import Uploader from './Uploader'
import { validate, valueOptions as op } from '../utils/category'
import api from '../api'
import '../css/productform.css'

const AddProductForm = ({
  reset, error, handleSubmit, submitting, submitSucceeded, optionList
}) => (
  <form onSubmit={handleSubmit}>
    <div className="col-lg-4 col-sm-12">
      <label htmlFor="name" className="form-control">Product name</label>
      <Field
        component={Input}
        name="name"
        placeholder="Specify product name"
      />

      <label htmlFor="manufacturer" className="form-control">Manufacturer</label>
      <Field
        component={Selector}
        name="manufacturer"
        options={optionList('manufacturer')}
        placeholder="Specify manufacturer"
        creatable
      />

      <label htmlFor="category" className="form-control">Category</label>
      <Field
        component={Selector}
        name="category"
        options={optionList('category')}
        placeholder="Specify category"
        creatable
      />

      <label htmlFor="price" className="form-control">Price</label>
      <Field
        component={Input}
        name="price"
        type="number"
        placeholder="Specify price"
      />
    </div>

    <div className="col-lg-4 col-sm-12">
      <label htmlFor="spec" className="form-control">Product specification</label>
      <Field
        component={Textarea}
        name="spec"
        rows={5}
        placeholder="Specify specification"
      />

      <label
        htmlFor="availability" className="form-control" style={{ marginTop: 21 }}
      >Availability</label>
      <Field
        component={Selector}
        name="availability"
        options={op.availability}
        clearable={false}
      />

      <label htmlFor="sale" className="form-control">On Sale</label>
      <Field
        component={Selector}
        name="sale"
        options={op.sale_otions}
        clearable={false}
      />
    </div>

    <div className="col-lg-4 col-sm-12">
      <label htmlFor="image" className="form-control">Upload Image</label>
      <Field
        component={Uploader}
        name="image"
      />
    </div>

    <div className="col-sm-12 text-center addProductBtn">
      <button
        type="submit"
        className="btn btn-md btn-primary m-t-20 hvr-sweep-to-right"
      >Submit</button>
      <button
        type="button"
        className="btn btn-md btn-danger m-t-20 hvr-sweep-to-right"
        onClick={reset}
      >Clear values</button>
    </div>
    {error && <strong>{error}</strong>}
    {!submitting && submitSucceeded && <strong>Successfully added new Product!</strong>}
  </form>
)

AddProductForm.propTypes = { ...propTypes, triggerSubmit: React.PropTypes.any }

AddProductForm.defaultProps = { error: '', triggerSubmit: null }

const initialValues = {
  availability: true,
  sale: 0
}

const pushProduct = p => getFirebase().push(api.database, p)
  .catch(() => { throw new SubmissionError({ _error: 'Failed to add product' }) })

export default reduxForm({
  form: 'addProductForm',
  onSubmit: pushProduct,
  initialValues,
  validate
})(AddProductForm)
