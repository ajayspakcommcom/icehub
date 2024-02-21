import React, { useState, useEffect } from "react";
import BannerCarouselImage from "@/models/BannerCarouselImage";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface BannerCarouselProps {
    images: BannerCarouselImage[];
}


const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {

    const setting = {
        showThumbs: false,
        showArrows: false,
        className: 'banner-carousel'
    };

    useEffect(() => {
        console.log(images);

        return () => console.log('unbind carousel images');
    }, []);

    return (
        <Carousel {...setting}>

            {images.map((image) => (
                <div className="content" key={image.id}>
                    <img key={image.id} src={`../../../images/banner/${image.imageUrl}`} width={500} height={300} />
                    <div className="text-part">
                        <p>Welcome to</p>
                        <h2>The Hub</h2>
                    </div>
                </div>
            ))}

        </Carousel>

    );
};

export default React.memo(BannerCarousel);
