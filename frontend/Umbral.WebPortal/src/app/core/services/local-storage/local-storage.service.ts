/* eslint-disable @typescript-eslint/no-explicit-any */

import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Utilities } from "../../utilities/utilities";

/**
 * Local storage service
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    private readonly _platformId: any = inject(PLATFORM_ID);

    /**
     * Whether we are executing on the browser.
     */
    private get isBrowser(): boolean {
        return isPlatformBrowser(this._platformId);
    }

    /**
     * Sets an item by a given key in the local storage.
     * @param key 
     * @param value 
     */
    public setItem<TObject>(key: string, value: TObject): void {

        if (!this.isBrowser)
            return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('An error saving to local storage', error);
        }
    }

    /**
     * Gets and item from the local storage b y a given key.
     * @param key 
     * @returns 
     */
    public getItem<TObject>(key: string): TObject | undefined {

        if (!this.isBrowser)
            return;

        const cachedItem: string | null = localStorage.getItem(key);

        if (!cachedItem)
            return;

        return Utilities.deserializeFromJson<TObject>(cachedItem);
    }

    /**
     * Removes an item from the local storage by a given key. 
     * @param key 
     */
    public removeItem(key: string): void {

        if (!this.isBrowser)
            return;

        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('An error removing item from local storage', error);
        }
    }

    /**
     * Clear all data in the local storage.
     */
    public clear(): void {

        if (!this.isBrowser)
            return;

        try {
            localStorage.clear();
        }
        catch (error) {
            console.error('An error clearing local storage', error);
        }
    }
}