import React, { useEffect } from 'react';
import style from './profile.module.scss';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import User from '@/models/User';


// import dynamic from 'next/dynamic';
// const ViewMoreButton = dynamic(() => import('@/components/view-more/view-more'));

interface ProfileProps {
    //title?: string;
}


const Profile: React.FC<ProfileProps> = () => {

    const { data: session } = useSession({ required: true });
    const userData = session?.user as User;

    useEffect(() => {
        console.log('data', session);

        return () => console.log();

    }, []);

    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userData');
        signOut({ callbackUrl: '/login', redirect: true });
    };

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
                                    <strong>{`${userData.firstName} ${userData.lastName}`} </strong>
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
                                    <strong onClick={() => logoutHandler()}>{'Log Out'}</strong>
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
