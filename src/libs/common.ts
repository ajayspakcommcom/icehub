
export const preventDefaultIfEnterHandler = (event: KeyboardEvent): void => {
    console.log('User pressed: ', event.key);
    if (event.key === 'Enter') {
        event.preventDefault();
    }
};