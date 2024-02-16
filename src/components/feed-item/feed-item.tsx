// Component.js
import React from 'react';
import style from './feed-item.module.scss';
import Image from 'next/image';

interface FeedItemProps {
    //title?: string;
}

const FeedItem: React.FC<FeedItemProps> = () => {
    return (
        <div className={style['feed-item-wrapper']}>
            <div className={style['header']}>
                <div className={style['top-content']}>
                    <div>
                        <div>
                            <Image src={require(`../../../public/images/feed/user.png`)} alt='' className='responsive-img' />
                            <div>
                                <strong>{'Doctor Name'}</strong>
                                <p>{'3 Aug at 7.58 pm'}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={require(`../../../public/images/icons/blog.png`)} alt='' className={`responsive-img ${style['type']}`} />
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                    tincidunt ut laoreet dolore magna aliquam erat volutpa</p>
            </div>

            <div className={`${style['content']}`}>
                <Image src={require(`../../../public/images/feed/blog.png`)} alt='' className='responsive-img' />
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

export default React.memo(FeedItem);
