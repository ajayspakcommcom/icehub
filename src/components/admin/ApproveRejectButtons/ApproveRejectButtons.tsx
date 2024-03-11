import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    onAccept?: (action: string) => void;
    onReject?: (action: string, reason?: string) => void;
}

const ApproveRejectButtons: React.FC<Props> = ({ onAccept, onReject }) => {
    const [rejectReason, setRejectReason] = useState<string>('');
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

    const handleAccept = () => {
        if (onAccept) {
            onAccept('accept');
        }
    };

    const handleReject = () => {
        if (onReject) {
            onReject('reject', rejectReason);
            setRejectReason('');
            setIsInputVisible(false);
        }
    };

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRejectReason(event.target.value);
    };

    const handleRejectClick = () => {
        setIsInputVisible(true);
    };


    return (
        <div className='blog-admin-approved-reject-wrapper'>
            {isInputVisible ? (
                <>
                    <TextField label="Reason for rejection" variant="outlined" value={rejectReason} onChange={handleReasonChange} fullWidth sx={{ marginBottom: 2 }} />
                    <Button variant="contained" color='error' onClick={handleReject} sx={{ marginRight: 2 }}>Reject</Button>
                </>
            ) : (
                <>
                    <Button variant="contained" color='error' onClick={handleRejectClick}>Reject</Button>
                </>
            )}
            <Button variant="contained" color='success' onClick={handleAccept}>Approve</Button>
        </div>
    );
};

export default React.memo(ApproveRejectButtons);
