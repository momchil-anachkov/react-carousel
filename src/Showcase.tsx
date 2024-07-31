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
    ];

    return (
        <div className="Showcase">
            <div className="section">
                <Carousel width="100%" height="300px" images={images}/>
            </div>
        </div>
    );
}

export default Showcase;
