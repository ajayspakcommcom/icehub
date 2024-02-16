import React from 'react';
import style from './profile.module.scss';
import Image from 'next/image';

// import dynamic from 'next/dynamic';
// const ViewMoreButton = dynamic(() => import('@/components/view-more/view-more'));

interface ProfileProps {
    //title?: string;
}

const Profile: React.FC<ProfileProps> = () => {
    return (
        <>
            <div className={style['profile-wrapper']}>
                <Image src={require(`../../../public/images/icons/user.png`)} alt='' />

                <div className={style['dropdown']}>
                    <ul>
                        <li>
                            <div>
                                <Image src={require(`../../../public/images/icons/user.png`)} alt='' className='responsive-img' />
                            </div>
                            <div>
                                <div>
                                    <strong>{'Doctor Name'}</strong>
                                    <p>{'View Profile'}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div></div>
                        </li>
                        <li>
                            <div>
                                <Image src={require(`../../../public/images/icons/logout.png`)} alt='' className='responsive-img' />
                            </div>
                            <div>
                                <div>
                                    <strong>{'Log Out'}</strong>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>
        </>
    );
};

export default React.memo(Profile);
