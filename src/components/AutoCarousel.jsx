import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../index.css';
import { Carousel } from 'react-responsive-carousel';

function DemoCarousel(props) {
  return (
    <div className="contain">
      <Carousel
        showStatus={false}
        infiniteLoop
        autoPlay
        transitionTime={1000}
        width={props.width}
        dynamicHeight={props.height}
        showArrows={props.showArrows}
        showThumbs={props.showThumbs}
        showIndicators={props.showIndicators}
      >
        <div>
          <img src={props.wireframe1} alt="wireframe1" />
        </div>
        <div>
          <img src={props.wireframe2} alt="wireframe2" />
        </div>
        <div>
          <img src={props.wireframe3} alt="wireframe3" />
        </div>
      </Carousel>
    </div>
  );
}

export default DemoCarousel;
