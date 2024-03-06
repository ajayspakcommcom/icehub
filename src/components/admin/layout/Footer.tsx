// Footer.tsx
import { Container, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface FooterProps {

}

const AdminFooter: FC<FooterProps> = () => {

    React.useEffect(() => {

        //return () => console.log('Unbind Header');
    }, []);

    return (
        <footer>
            <Container>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Your Company Name
                </Typography>
                <Typography variant="body2">
                    <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
                </Typography>
            </Container>
        </footer>
    );
};

export default React.memo(AdminFooter);
