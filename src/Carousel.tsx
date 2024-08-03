import React, {UIEventHandler, UIEvent, useEffect, useState, useRef} from 'react';
import './Carousel.css';

function Carousel(props: {
    width: string,
    height: string,
    images: { src: string }[]
    virtualScroll: VirtualScrollConfig,
}) {
    const width = useRef(0);
    const height = useRef(0);
    const imageStart = useRef(0);
    const imageTrackRef = useRef<HTMLDivElement | null>(null);
    const [imagesToRender, setImagesToRender] = useState(props.images.slice(imageStart.current, props.virtualScroll.domImageCount));

    /* Keep track of the carousel size */
    useEffect(() => {
        const updateSize = () => {
            console.assert(imageTrackRef.current != null, 'trackRef was null');
            const newWidth = imageTrackRef.current!.offsetWidth;
            const newHeight = imageTrackRef.current!.offsetHeight;

            width.current = newWidth;
            height.current = newHeight;
        }

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        }
    }, []);

    const images = imagesToRender.map((image, index) => {
        return <img width="100%" key={index} src={image.src} alt="A random image"/>
    });

    const scrollHandler: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
        scrollEndHandler(event);
    }

    const scrollEndHandler: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        let shiftBy = props.virtualScroll.shiftBy;

        /* See if we need to load images ahead */
        const imagesLeft = (target.scrollWidth - target.scrollLeft) / width.current;
        const shouldLoadAhead = imagesLeft < props.virtualScroll.shiftAheadWhenImagesLeft;
        if (shouldLoadAhead) {
            imageStart.current += shiftBy;

            if (imageStart.current > props.virtualScroll.totalImageCount) {
                imageStart.current -= props.images.length;
            }

            if (imageStart.current + props.virtualScroll.domImageCount > props.virtualScroll.totalImageCount) {
                const imagesFromTheEnd = props.images.slice(imageStart.current, props.images.length);
                const imagesFromTheStart = props.images.slice(0, props.virtualScroll.domImageCount - imagesFromTheEnd.length);
                setImagesToRender(imagesFromTheEnd.concat(imagesFromTheStart));
            } else {
                setImagesToRender(props.images.slice(imageStart.current, imageStart.current + props.virtualScroll.domImageCount));
            }

            target.scrollLeft -= shiftBy * width.current;
        }

        /* See if we need to load images behind */
        const currentPosition = target.scrollLeft / width.current;
        const shouldLoadBehind = currentPosition < props.virtualScroll.shiftBehindWhenImagesLeft
        if (shouldLoadBehind) {
            imageStart.current -= shiftBy;

            if (imageStart.current < 0) {
                imageStart.current += props.images.length;
            }

            if (imageStart.current + props.virtualScroll.domImageCount > props.virtualScroll.totalImageCount) {
                const imagesFromTheEnd = props.images.slice(imageStart.current, props.images.length);
                const imagesFromTheStart = props.images.slice(0, props.virtualScroll.domImageCount - imagesFromTheEnd.length);
                setImagesToRender(imagesFromTheEnd.concat(imagesFromTheStart));
            } else {
                setImagesToRender(props.images.slice(imageStart.current, imageStart.current + props.virtualScroll.domImageCount));
            }

            target.scrollLeft += shiftBy * width.current;
        }
    }

    return (
        <div className="Carousel">
            <div onScroll={scrollHandler} className="image-track" ref={imageTrackRef}>
                {images}
            </div>
        </div>
    );
}

export interface VirtualScrollConfig {
    totalImageCount: number;
    domImageCount: number;

    shiftAheadWhenImagesLeft: number;
    shiftBehindWhenImagesLeft: number;

    shiftBy: number;
}

export default Carousel;
