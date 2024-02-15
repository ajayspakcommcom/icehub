import { useEffect, useState } from 'react';

function useElementText(id: string): string {

    const [text, setText] = useState('');

    useEffect(() => {
        const element = document.getElementById(id);
        if (element) {
            setText(element.textContent || '');
        }
    }, [id]);

    return text;
}

export default useElementText;
