import React, {UIEventHandler, UIEvent} from 'react';
import './Carousel.css';

function Carousel(props: {
    width: string,
    height: string,
    images: { src: string }[]
}) {
    const images = props.images.map((image, index) => {
        // return <img key={index} width={image.width} height={image.height} src={image.src} alt="A random image"/>
        return <img width="100%" key={index} src={image.src} alt="A random image"/>
    });

    const imageTrackStyle = {
        width: props.width,
        height: props.height,
    }

    const scrollHandler: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
    }

    return (
        <div className="Carousel">
            <div onScroll={scrollHandler} className="image-track" style={imageTrackStyle}>
                {images}
            </div>
        </div>
    );
}

// TODO: Infinite scroll
interface infiniteScrollConfig {
    totalImageCount: number;
    domImageCount: number;
    loadAheadPoint: number;
    loadBehindPoint: number;
}

interface infiniteScrollConfigExample {
    totalImageCount: 200;
    domImageCount: 50;
    loadAheadPoint: 40;
    loadBehindPoint: 10;
}

export default Carousel;
