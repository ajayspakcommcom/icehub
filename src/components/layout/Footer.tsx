// Footer.tsx
import { Container, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface FooterProps {
    // Add any footer-specific props if needed
}

const Index: FC<FooterProps> = () => {

    React.useEffect(() => {

        //console.log('Bind Footer');

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

export default React.memo(Index);
