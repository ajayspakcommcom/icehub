import React from 'react';
import style from './header.module.scss';
import { Container, Grid, TextField } from '@mui/material';
import Image from 'next/image';

import dynamic from 'next/dynamic';
const Notification = dynamic(() => import('@/components/notification/notification'));
const Profile = dynamic(() => import('@/components/profile/profile'));

interface HeaderProps {
    //title?: string;
}


const Header: React.FC<HeaderProps> = () => {
    return (
        <header className={style['header-wrapper']}>
            <Container>
                <Grid container>
                    <Grid item xs={3} className={style['flex-v-center']}>
                        <Image src={require('../../../public/images/feed-logo.png')} alt="Logo" layout="responsive responsive-img" />
                    </Grid>
                    <Grid item xs={6} className={style['flex-v-center']}>
                        <div className={`${style['search-input']}`}>
                            <TextField type="text" name="email" variant="outlined" fullWidth placeholder='Search...' />
                        </div>
                    </Grid>
                    <Grid item xs={3} className={`${style['flex-v-center']} ${style['flex-h-end']}`}>
                        <Notification />
                        <Profile />
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default React.memo(Header);
