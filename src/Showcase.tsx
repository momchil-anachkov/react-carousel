import React from 'react';
import './Showcase.css';
import Carousel, {VirtualScrollConfig} from './Carousel';

function Showcase() {

    const images = [
        { src:`https://picsum.photos/${600}/${300}?random=${1}` },
        { src:`https://picsum.photos/${200}/${300}?random=${2}` },
        { src:`https://picsum.photos/${1000}/${200}?random=${3}` },
        { src:`https://picsum.photos/${300}/${800}?random=${4}` },
        { src:`https://picsum.photos/${300}/${300}?random=${5}` },
        { src:`https://picsum.photos/${300}/${600}?random=${6}` },
        { src:`https://picsum.photos/${300}/${600}?random=${7}` },
        { src:`https://picsum.photos/${300}/${600}?random=${8}` },
        { src:`https://picsum.photos/${300}/${600}?random=${9}` },
        { src:`https://picsum.photos/${300}/${600}?random=${10}` },
        { src:`https://picsum.photos/${300}/${600}?random=${11}` },
        { src:`https://picsum.photos/${300}/${600}?random=${12}` },
        { src:`https://picsum.photos/${300}/${600}?random=${13}` },
        { src:`https://picsum.photos/${300}/${600}?random=${14}` },
        { src:`https://picsum.photos/${300}/${600}?random=${15}` },
        { src:`https://picsum.photos/${300}/${600}?random=${16}` },
        { src:`https://picsum.photos/${300}/${600}?random=${17}` },
        { src:`https://picsum.photos/${300}/${600}?random=${18}` },
        { src:`https://picsum.photos/${300}/${600}?random=${19}` },
        { src:`https://picsum.photos/${300}/${600}?random=${20}` },
    ];

    const virtualScrollConfig: VirtualScrollConfig = {
        totalImageCount: 20,
        domImageCount: 10,
        shiftAheadPoint: 6,
        shiftBehindPoint: 4,
        shiftBy: 2,
    }

    return (
        <div className="Showcase">
            <div className="section">
                <Carousel width="100%" height="300px" images={images} virtualScroll={virtualScrollConfig}/>
            </div>
        </div>
    );
}

export default Showcase;
