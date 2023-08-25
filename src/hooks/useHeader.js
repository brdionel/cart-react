import { useRef, useEffect, useState } from "react";

export const useHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollPos = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos <= 100) {
        setIsVisible(true);
      } else {
        if (prevScrollPos.current > currentScrollPos) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isVisible,
  };
};
