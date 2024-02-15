import { useCallback, useState } from 'react';

function useOnClickText(): [string, (event: React.MouseEvent<HTMLElement>) => void] {

    const [text, setText] = useState('');

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setText(event.currentTarget.textContent || '');
    }, []);

    return [text, handleClick];
}

export default useOnClickText;
