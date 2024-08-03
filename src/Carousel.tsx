import React, {UIEventHandler, UIEvent, useEffect, useState, useRef, useLayoutEffect} from 'react';
import './Carousel.css';

function Carousel(props: {
    width: string,
    height: string,
    images: { src: string }[]
    virtualScroll: VirtualScrollConfig,
}) {
    const width = useRef(0);
    const height = useRef(0);
    // TODO: Preload images behind on startup
    const imageStart = useRef(0);
    const imageTrackRef = useRef<HTMLDivElement | null>(null);
    const [imagesToRender, setImagesToRender] = useState(props.images.slice(imageStart.current, props.virtualScroll.domImageCount));
    const scrollAdjustment = useRef(0);
    const scrollEndTimeout = useRef(0);

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

    const realignOnScrollEnd = () => {
        if (scrollEndTimeout.current !== 0) {
            clearTimeout(scrollEndTimeout.current);
        }

        scrollEndTimeout.current = setTimeout(() => {
            const currentPosition = Math.round(imageTrackRef.current!.scrollLeft / width.current);
            imageTrackRef.current!.scrollTo({ left: currentPosition * width.current, behavior: 'smooth' });
        }, 50) as any;
    }

    const checkAndShiftVirtualWindow: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
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

            scrollAdjustment.current -= (shiftBy * width.current);
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

            scrollAdjustment.current += (shiftBy * width.current);
        }
    }

    useLayoutEffect(() => {
        if (scrollAdjustment.current !== 0) {
            imageTrackRef.current!.scrollLeft += scrollAdjustment.current;
            scrollAdjustment.current = 0;
        }
    });

    const onScroll: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
        realignOnScrollEnd();
        checkAndShiftVirtualWindow(event);
    }

    return (
        <div className="Carousel">
            <div onScroll={onScroll} className="image-track" ref={imageTrackRef}>
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
