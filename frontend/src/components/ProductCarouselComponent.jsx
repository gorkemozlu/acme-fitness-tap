import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Card, CardImg
} from 'reactstrap';
import { urlFix } from '../shared/urlFix';

function Slide({a,b,c,d}) {
  return (
      <div className="row">
          {a}
          {b}
          {c}
          {d}                                   
      </div>
  );
}

function slides(items) {
  var indexRange = items.map((_, i) => {return i;});

  var cards = indexRange.map((i) => {
    return (
      <div className="col-md-3 mb-3">
        <Card>
            <CardImg src={urlFix(items[i].imageUrl1)} alt={items[i].name} />
        </Card>
      </div>
    );
  });

  var slides = indexRange.map((i) => {
    return (<Slide a={cards[i]} b={cards[(i+1) % cards.length]} c={cards[(i+2) % cards.length]} d={cards[(i+3) % cards.length]}/>);
  });

  return slides;
}


const ProductCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const catSlides = slides(props.items).map((sld, i) => {
    return (
          <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={"item-"+i}
          >
            {sld}
          </CarouselItem>
        );
  })

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }




  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval="3000"
    >
      <CarouselIndicators items={props.items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {catSlides}
      {/* <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} /> */}
      {/* <CarouselControl direction="next" directionText="Next" onClickHandler={next} /> */}
      </Carousel>
  );
}

export default ProductCarousel;