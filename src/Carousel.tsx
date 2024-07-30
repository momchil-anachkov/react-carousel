import React, {useEffect, useRef, useState} from 'react';
import './Carousel.css';

function Carousel() {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const offsetWidth = carouselRef.current?.offsetWidth ?? 0;
        const offsetHeight = carouselRef.current?.offsetHeight ?? 0;

        setWidth(offsetWidth);
        setHeight(offsetHeight);
    }, []);

    const imageCount = 5;

    const images = Array(imageCount).fill(0).map((_, index) => {
        // FIXME: 0/0 gives you the full image, so the requests get quite big
        //  We need to have the sizes before the first render I think
        const url = `https://picsum.photos/${width}/${height}?random=${index}`;
        return <img key={index} src={url} alt="A random image"/>
    });

    return (
        <div ref={carouselRef} className="Carousel">
            {images}
        </div>
    );
}

export default Carousel;
