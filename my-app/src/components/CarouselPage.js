import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from './images/image1.jpg'
import img2 from './images/image2.jpg'
import img3 from './images/image3.jpg'
import './CarouselPage.css'

function CarouselPage() {
  return (
    <div className="Zn my-3 mx-5">
    <Carousel class="carousel slide carousel-fade" >
    <Carousel.Item>
      <img 
        className="d-block w-100"
        class="img-fluid"
        src="https://source.unsplash.com/1400x400/?hospital,building"
        alt="First slide"
      />
      {/* <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption> */}
    </Carousel.Item>
    <Carousel.Item>
      <img 
        className="d-block w-100"
        class="img-fluid"
        src="https://source.unsplash.com/1400x400/?nature,coder"
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img 
        className="d-block w-100"
        src="https://source.unsplash.com/1400x400/?nature,coder"
        class="img-fluid"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
  </div>
  )
}

export default CarouselPage