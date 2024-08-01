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
    const shiftAheadPoint = useRef(props.virtualScroll.shiftAheadPoint);
    const shiftBehindPoint = useRef(props.virtualScroll.shiftBehindPoint);

    const imageTrackRef = useRef<HTMLDivElement | null>(null);

    const [imagesToRender, setImagesToRender] = useState(props.images.slice(imageStart.current, props.virtualScroll.domImageCount));

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
            console.log('removing resize')
            window.removeEventListener('resize', updateSize);
        }
    }, []);

    const images = imagesToRender.map((image, index) => {
        return <img width="100%" key={index} src={image.src} alt="A random image"/>
    });


    const imageTrackStyle = {
        width: props.width,
        height: props.height,
    }

    const scrollHandler: UIEventHandler<HTMLDivElement> = (event: UIEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        const currentPosition = target.scrollLeft / width.current;

        const movedPastTheShiftAheadPoint = currentPosition > shiftAheadPoint.current;
        if (movedPastTheShiftAheadPoint) {
            imageStart.current += props.virtualScroll.shiftBy;

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

            target.scrollLeft -= props.virtualScroll.shiftBy * width.current;
        }

        const movedPastTheShiftBehindPoint = currentPosition < shiftBehindPoint.current;
        if (movedPastTheShiftBehindPoint) {
            imageStart.current -= props.virtualScroll.shiftBy;

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

            target.scrollLeft += props.virtualScroll.shiftBy * width.current;
        }
    }

    return (
        <div className="Carousel">
            <div onScroll={scrollHandler} className="image-track" ref={imageTrackRef} style={imageTrackStyle}>
                {images}
            </div>
        </div>
    );
}

export interface VirtualScrollConfig {
    totalImageCount: number;
    domImageCount: number;
    shiftAheadPoint: number;
    shiftBehindPoint: number;
    shiftBy: number;
}

export default Carousel;
