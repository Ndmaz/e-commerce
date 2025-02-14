export function setLocalStorage(key: string, value: any): void {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error setting localStorage item:', error);
    }
}

export function getLocalStorage(key: string): any {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error('Error getting localStorage item:', error);
        return null;
    }
}