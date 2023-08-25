import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { useCarousel } from "../hooks/useCarousel";
import LazyImage from "./lazyImage";
import "./carousel.css";

const Carousel = ({ images = [] } = {}) => {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className="glide my-carousel">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images.map((image) => (
            <li className="glide__slide" key={image}>
                <LazyImage src={image} alt={image} /> 
            </li>
          ))}
        </ul>
      </div>
      <div
        className="glide__bullets glide__bullets_custom"
        data-glide-el="controls[nav]"
      >
        {images.length > 1 &&
          images.map((slide, index) => (
            <button
              className="glide__bullet"
              data-glide-dir={`=${index}`}
              key={index}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
