import React, { PropTypes, Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import shortid from 'shortid'
import fileExtension from 'file-extension'
import cloud from '../images/cloud.png'
import gears from '../images/gears.svg'
import api from '../api'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.state = { uploading: false, error: ''  }
  }

  uploadFile = f => {
    const { onChange } = this.props.input
    onChange('http://lorempixel.com/400/300/')
    // const refType = fileExtension(f.target.files[0].name)

    // if (refType !== 'png' && refType !== 'jpg') {
    //   alert('Not Image File')
    //   return
    // }
    
    // this.setState({ uploading: true, imageRef: null })
    // const refName = `${shortid.generate()}.${refType}`

    // const productRef = this.props.firebase.storage().ref(`${api.storage}/${refName}`)
    // productRef.put(f.target.files[0]).then(sp => {
    //   if (sp.f === 'success') {
    //     productRef.getDownloadURL().then(
    //       imageRef => {
    //         onChange(imageRef)
    //         this.setState({ uploading: false, error: '' })
    //     })
    //   } else {
    //     this.setState({ uploading: false, error: 'Error uploading file' })
    //   }
    // })
  }

  render() {
    const { uploading } = this.state
    const { value, onBlur, onFocus } = this.props.input
    const { touched, error } = this.props.meta
    const uploaderClassname = (touched && error) ? 'uploader -hasError' : 'uploader'
    return (
      <div className={uploaderClassname}>
        <div className="inset-uploader">
          <input type="file" multiple={false} onChange={this.uploadFile} onFocus={onFocus} onBlur={() => onBlur()} />
          {value && <img src={value} alt="product" className="bucket-image"/>}
          {!value && (
            <div className="indicator-wrapper">
              <img src={uploading ? gears : cloud} alt="loading" className="indicator"/>
            </div>)}
        </div>
      </div>
    )
  }
}

export default firebaseConnect()(Uploader)
