import React from 'react';
import './Showcase.css';
import Carousel from './Carousel';

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
        { src:`https://picsum.photos/${600}/${300}?random=${21}` },
        { src:`https://picsum.photos/${200}/${300}?random=${22}` },
        { src:`https://picsum.photos/${1000}/${200}?random=${23}` },
        { src:`https://picsum.photos/${300}/${800}?random=${24}` },
        { src:`https://picsum.photos/${300}/${300}?random=${25}` },
        { src:`https://picsum.photos/${300}/${600}?random=${26}` },
        { src:`https://picsum.photos/${300}/${600}?random=${27}` },
        { src:`https://picsum.photos/${300}/${600}?random=${28}` },
        { src:`https://picsum.photos/${300}/${600}?random=${29}` },
        { src:`https://picsum.photos/${300}/${600}?random=${30}` },
        { src:`https://picsum.photos/${300}/${600}?random=${31}` },
        { src:`https://picsum.photos/${300}/${600}?random=${32}` },
        { src:`https://picsum.photos/${300}/${600}?random=${33}` },
        { src:`https://picsum.photos/${300}/${600}?random=${34}` },
        { src:`https://picsum.photos/${300}/${600}?random=${35}` },
        { src:`https://picsum.photos/${300}/${600}?random=${36}` },
        { src:`https://picsum.photos/${300}/${600}?random=${37}` },
        { src:`https://picsum.photos/${300}/${600}?random=${38}` },
        { src:`https://picsum.photos/${300}/${600}?random=${39}` },
        { src:`https://picsum.photos/${300}/${600}?random=${40}` },
    ];

    const virtualScrollConfig = {
        windowSize: 20,
        shiftAheadWhenImagesLeft: 5,
        shiftBehindWhenImagesLeft: 5,
        shiftBy: 7,
    }

    return (
        <div className="Showcase">
            <div className="section">
                <Carousel images={images} virtualScroll={virtualScrollConfig}/>
            </div>
        </div>
    );
}

export default Showcase;
