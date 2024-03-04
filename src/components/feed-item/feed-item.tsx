// Component.js
import React from 'react';
import style from './feed-item.module.scss';
import Image from 'next/image';
import { FeedTask } from '@/models/FeedTask';
import { formatDate } from '@/libs/format';




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
                                    <p>{feedItemTask.createdDate.toString()}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image src={require(`../../../public/images/icons/video.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        </div>
                    </div>
                    <h2 className='video-title'>{feedItemTask.videoTitle}</h2>
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
                        <span>{feedItemTask.likes.length > 0 ? feedItemTask.likes.length : ''}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (feedItemTask.task.taskType === '65d734678abbb6154ff8aff0') {
        return (
            <div className={style['feed-item-wrapper']}>
                <div className={style['header']}>
                    <div className={style['top-content']}>
                        <div>
                            <div>
                                <Image src={require(`../../../public/images/feed/user.png`)} alt='' className='responsive-img' />
                                <div>
                                    <strong>{`${feedItemTask.user.firstName} ${feedItemTask.user.lastName}`}</strong>
                                    <p>{feedItemTask.createdDate.toString()}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image src={require(`../../../public/images/icons/case-study.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        </div>
                    </div>
                </div>

                <div className={`${style['content']}`}>
                    <div className="detail-case-study-wrapper">
                        <h2>{feedItemTask.caseStudyTitle}</h2>
                        <div className='feed-cs-img-wrapper'>
                            <Image src={require('../../../public/images/cs/ca-image.png')} alt="Description of the image" className='responsive-img' />
                        </div>
                    </div>
                </div>

                <div className={`${style['footer']}`}>
                    <div className={`${style['like-wrapper']}`}>
                        <Image src={require(`../../../public/images/feed/like.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        <span>{feedItemTask.likes.length > 0 ? feedItemTask.likes.length : ''}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (feedItemTask.task.taskType === '65d734098abbb6154ff8afea') {
        return (
            <div className={style['feed-item-wrapper']}>
                <div className={style['header']}>
                    <div className={style['top-content']}>
                        <div>
                            <div>
                                <Image src={require(`../../../public/images/feed/user.png`)} alt='' className='responsive-img' />
                                <div>
                                    <strong>{`${feedItemTask.user.firstName} ${feedItemTask.user.lastName}`}</strong>
                                    <p>{feedItemTask.createdDate.toString()}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Image src={require(`../../../public/images/icons/case-study.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        </div>
                    </div>
                </div>

                <div className={`${style['content']}`}>
                    <div className={`detail-blog-wrapper ${feedItemTask.selectedBlog}`}>
                        <h2 className='h2'>{feedItemTask.blogTitle}</h2>
                        <p className='blogParagraph'>{feedItemTask.blogParagraph}</p>
                    </div>
                </div>

                <div className={`${style['footer']}`}>
                    <div className={`${style['like-wrapper']}`}>
                        <Image src={require(`../../../public/images/feed/like.png`)} alt='' className={`responsive-img ${style['type']}`} />
                        <span>{feedItemTask.likes.length > 0 ? feedItemTask.likes.length : ''}</span>
                    </div>
                </div>
            </div>
        );
    }


}

export default React.memo(FeedItem);
