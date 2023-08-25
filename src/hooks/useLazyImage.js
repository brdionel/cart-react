import { useEffect } from "react";

export function useLazyImage(imageRef, src) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const image = entry.target;
              image.src = src;
              observer.unobserve(image);
            }
          });
        });
    
        observer.observe(imageRef.current);
    
      }, [src, imageRef]);
}