import { useRef } from "react";
import { useLazyImage } from "../hooks/useLazyImage";

const LazyImage = ({ src, alt }) => {
    const imageRef = useRef(null);

    useLazyImage(imageRef, src)
    
    return <img ref={imageRef} src="" alt={alt} />;
}

export default LazyImage;