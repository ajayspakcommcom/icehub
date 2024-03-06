// Footer.tsx
import { Container, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface FooterProps {

}

const AdminFooter: FC<FooterProps> = () => {

    React.useEffect(() => {

        console.log('Bind footer Header');

        return () => console.log('Unbind footer Header');
    }, []);

    return (
        <footer className='copyright'>
            <div>
                <Typography variant="body2">
                    Copyright &copy; {new Date().getFullYear()} Icehub Pvt. Ltd. Designed by <Link href="https://spakcomm.com/" target='_blank'>Spak Communication Pvt. Ltd.</Link>
                </Typography>
            </div>
        </footer>
    );
};

export default React.memo(AdminFooter);
