import React, {CSSProperties, UIEventHandler, useEffect, useLayoutEffect, useRef, useState} from 'react';
import './Carousel.css';

export interface CarouselProps {
    images: CarouselImage[],
    virtualScroll: {
        windowSize: number;
        shiftAheadWhenImagesLeft: number;
        shiftBehindWhenImagesLeft: number;
        shiftBy: number;
    },
}

export interface CarouselImage {
    src: string,
    style?: CSSProperties,
}

function Carousel({
    images,
    virtualScroll,
}: CarouselProps) {
    const currentWidth = useRef(0);
    const currentHeight = useRef(0);
    const imageStart = useRef(0);
    const imageTrackRef = useRef<HTMLDivElement | null>(null);
    const [imagesToRender, setImagesToRender] = useState(images.slice(imageStart.current, virtualScroll.windowSize));
    const scrollAdjustment = useRef(0);
    const scrollEndTimeout = useRef(0);

    const snapToImage = () => {
        const currentPosition = Math.round(imageTrackRef.current!.scrollLeft / currentWidth.current);
        imageTrackRef.current!.scrollTo({left: currentPosition * currentWidth.current, behavior: 'smooth'});
    }

    const snapToImageAfterMs = (time: number) => {
        if (scrollEndTimeout.current !== 0) {
            clearTimeout(scrollEndTimeout.current);
        }

        scrollEndTimeout.current = setTimeout(snapToImage, time) as any;
    }

    /* Keep track of the carousel size */
    useEffect(() => {
        const updateSize = () => {
            const newWidth = imageTrackRef.current!.offsetWidth;
            const newHeight = imageTrackRef.current!.offsetHeight;

            currentWidth.current = newWidth;
            currentHeight.current = newHeight;

            /* Re-snap to image after carousel size update */
            snapToImage();
            const currentPosition = Math.round(imageTrackRef.current!.scrollLeft / currentWidth.current);
            imageTrackRef.current!.scrollTo({left: currentPosition * currentWidth.current, behavior: 'smooth'});
        }

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
        }
    }, []);

    const checkAndShiftVirtualWindow = () => {
        const target = imageTrackRef.current as HTMLDivElement;

        /* See if we need to load images ahead */
        const imagesLeftAhead = (target.scrollWidth - target.scrollLeft) / currentWidth.current;
        const shouldLoadAhead = imagesLeftAhead < virtualScroll.shiftAheadWhenImagesLeft;
        if (shouldLoadAhead) {
            imageStart.current += virtualScroll.shiftBy;

            if (imageStart.current > images.length) {
                imageStart.current -= images.length;
            }

            if (imageStart.current + virtualScroll.windowSize > images.length) {
                const imagesFromTheEnd = images.slice(imageStart.current, images.length);
                const imagesFromTheStart = images.slice(0, virtualScroll.windowSize - imagesFromTheEnd.length);
                setImagesToRender(imagesFromTheEnd.concat(imagesFromTheStart));
            } else {
                setImagesToRender(images.slice(imageStart.current, imageStart.current + virtualScroll.windowSize));
            }

            scrollAdjustment.current -= (virtualScroll.shiftBy * currentWidth.current);
        }

        /* See if we need to load images behind */
        const currentPosition = target.scrollLeft / currentWidth.current;
        const shouldLoadBehind = currentPosition < virtualScroll.shiftBehindWhenImagesLeft
        if (shouldLoadBehind) {
            imageStart.current -= virtualScroll.shiftBy;

            if (imageStart.current < 0) {
                imageStart.current += images.length;
            }

            if (imageStart.current + virtualScroll.windowSize > images.length) {
                const imagesFromTheEnd = images.slice(imageStart.current, images.length);
                const imagesFromTheStart = images.slice(0, virtualScroll.windowSize - imagesFromTheEnd.length);
                setImagesToRender(imagesFromTheEnd.concat(imagesFromTheStart));
            } else {
                setImagesToRender(images.slice(imageStart.current, imageStart.current + virtualScroll.windowSize));
            }

            scrollAdjustment.current += (virtualScroll.shiftBy * currentWidth.current);
        }
    }

    useLayoutEffect(() => {
        if (scrollAdjustment.current !== 0) {
            imageTrackRef.current!.scrollLeft += scrollAdjustment.current;
            scrollAdjustment.current = 0;
        }
    });

    /* Adjust the virtual scroll window after the initial render, so we have images behind as well */
    useEffect(() => {
        checkAndShiftVirtualWindow();
    }, []);

    const onScroll: UIEventHandler<HTMLDivElement> = () => {
        snapToImageAfterMs(50);
        checkAndShiftVirtualWindow();
    }

    const domImages = imagesToRender.map((image, index) => {
        return <img key={index} src={image.src} style={image.style} alt="A random image"/>
    });

    return (
        <div className="Carousel">
            <div onScroll={onScroll} className="image-track" ref={imageTrackRef}>
                {domImages}
            </div>
        </div>
    );
}


export default Carousel;
