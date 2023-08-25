import { useRef, useEffect } from "react";
import Glide from "@glidejs/glide";

export function useCarousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    new Glide(carouselRef.current, {
      type: "carousel",
      perView: 1,
    }).mount();
  }, []);

  return {
    carouselRef,
  };
}
