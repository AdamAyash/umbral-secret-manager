import { Injectable } from "@angular/core";

/**
 * Local storage service
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    /**
     * Sets an item by a given key in the local storage.
     * @param key 
     * @param value 
     */
    public setItem(key: string, value: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to local storage', error);
        }
    }

    /**
     * Gets and item from the local storage b y a given key.
     * @param key 
     * @returns 
     */
    public getItem(key: string): any {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;

        } catch (error) {
            console.error('Error reading an item from local storage', error);
            return null;
        }
    }

    /**
     * Removes an item from the local storage by a given key. 
     * @param key 
     */
    public removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from local storage', error);
        }
    }

    /**
     * Clear all data in the local storage.
     */
    public clear(): void {
        try {
            localStorage.clear();
        }
        catch (error) {

        }
    }
}