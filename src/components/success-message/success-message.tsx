import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { AlertTitle } from '@mui/material';

interface SuccessMessageProps {
    message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {

    useEffect(() => {
        console.log("Component mounted or updated");
        return () => {
            console.log("Component unmounted");
        };
    }, [message]); 

    return (
        <Alert severity="success">
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    );
};

export default React.memo(SuccessMessage);
