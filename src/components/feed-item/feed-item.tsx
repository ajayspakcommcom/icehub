// Component.js
import React from 'react';
import style from './feed-item.module.scss';
import Image from 'next/image';
import { FeedTask } from '@/models/FeedTask';
import { formatDateToDDMMYYYY } from '@/utils/common';


interface FeedItemProps {
    feedItemTask: FeedTask
}

const FeedItem: React.FC<FeedItemProps> = ({ feedItemTask }) => {

    React.useEffect(() => {

        console.log('feedItemTask', feedItemTask);


        return () => console.log('');
    }, [feedItemTask]);

    if (feedItemTask.task.taskType === '65d734618abbb6154ff8afee') {
        return (
            <div className={style['feed-item-wrapper']}>
                <div className={style['header']}>
                    <div className={style['top-content']}>
                        <div>
                            <div>
                                <Image src={require(`../../../public/images/feed/user.png`)} alt='' className='responsive-img' />
                                <div>
                                    <strong>{`${feedItemTask.user.firstName} ${feedItemTask.user.lastName}`}</strong>
                                    <p>{formatDateToDDMMYYYY(feedItemTask.createdDate)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image src={require(`../../../public/images/icons/video.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        </div>
                    </div>
                    <p>{feedItemTask.videoTitle}</p>
                </div>

                <div className={`${style['content']}`}>
                    <div className='feed-video-wrapper'>
                        <video controls>
                            <source src={feedItemTask.videoUrl} type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div className={`${style['footer']}`}>
                    <div className={`${style['like-wrapper']}`}>
                        <Image src={require(`../../../public/images/feed/like.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        <span>123</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h1>Kuchh Nahi</h1>
        </>
    );


}

export default React.memo(FeedItem);
