import React, { useEffect } from 'react';
import Image from 'next/image';
import FilterTask from '@/models/FiterTask';

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AnnouncementCarouselImage from '@/models/AnnouncementCarouselImage';

interface AnnouncementBannerProps {
    //title?: string;
}

const images: AnnouncementCarouselImage[] = [
    { id: 1, imageUrl: '1.png', text: 'Announcement Banner 1' },
    { id: 2, imageUrl: '1.png', text: 'Announcement Banner 2' },
    { id: 3, imageUrl: '1.png', text: 'Announcement Banner 3' }
];


const AnnouncementBanner: React.FC<AnnouncementBannerProps> = () => {

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
        <>
            <div className={'announcement-banner-wrapper'}>
                <Carousel {...setting}>
                    {images.map((image) => (
                        <div className={`content`}>
                            <img key={image.id} src={`../../../images/announcement-banner/1.png`} />
                            <div className="text-part"><p>Announcement Banner</p></div>
                        </div>
                    ))}
                </Carousel>

            </div>
        </>
    );
};

export default React.memo(AnnouncementBanner);
