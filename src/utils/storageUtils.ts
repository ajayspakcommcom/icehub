// src/utils/storageUtils.ts

export const saveToLocalStorage = (key: string, value: any): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (err) {
        console.error('Error saving to local storage', err);
    }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue) as T;
    } catch (err) {
        console.error('Error loading from local storage', err);
        return null;
    }
};
