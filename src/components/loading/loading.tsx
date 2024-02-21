import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {

}

const Loading: React.FC<LoadingProps> = () => (
    <div className='loader-wrapper'>
        <CircularProgress />
    </div>
);

export default React.memo(Loading);