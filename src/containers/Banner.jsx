import React, { Component } from 'react'
import { Link } from 'react-router'
import Carousel from 'react-img-carousel'
import 'react-img-carousel/lib/carousel.css'
import banner1 from '../images/carousel/banner1.jpg'
import banner2 from '../images/carousel/banner2.jpg'
import banner3 from '../images/carousel/banner3.jpg'
import '../css/carousel.css'

export default class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0
    }
  }

  render() {
    const activeBulletClass = id => (id - 1) === this.state.currentSlide ? 'b-active' : 'b-non-active'
    const config = {
      height: '100vh',
      viewportHeight: '100%',
      slideHeight: '100%',
      width: '100%',
      slideWidth: '100%',
      dots: false,
      arrows: true,
      infinite: true,
      cellPadding: 0,
      transition: 'fade',
      autoplay: true,
      autoplaySpeed: 5000,
      transitionDuration: 1000,
      draggable: false,
      pauseOnHover: false,
      afterChange: (currentSlide => this.setState({ currentSlide }))
    }
    return (
      <div className="banner">
        <div className="text-center carousel-title">
          <div className="background-dim-carousel" />
          <div className="carousel-inner-content">
            <div className="content-center ml-5 mr-5">
              <text className="title">Electronic Tools</text>
              <text className="subtitle">
                the largest finest electronic product distributor in Vietnam
              </text>
              <div className="row mb-1 mt-1">
                <text className="content">
                  We are sure you will find what you are looking for here
                ! Browse our shop for millions goods that fir any of your need
              </text>
              </div>
              <Link className="carousel-shop-button cursor-pointer" to="/shop">Shop Now</Link>
            </div>
          </div>
        </div>
        <Carousel {...config}>
          <img src={banner1} alt="banner1" className="carousel-img" />
          <img src={banner2} alt="banner2" className="carousel-img" />
          <img src={banner3} alt="banner3" className="carousel-img" />
        </Carousel>
        <ul className="customdot">
          <li><div className={activeBulletClass(1)} /></li>
          <li><div className={activeBulletClass(2)} /></li>
          <li><div className={activeBulletClass(3)} /></li>
        </ul>
      </div>
    )
  }
}
