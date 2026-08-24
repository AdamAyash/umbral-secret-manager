/**
 * Common utilities class
 */
export class Utilities {

    /**
     * Deserializing json to an object
     * @returns 
     */
    public static deserializeFromJson<TObject>(json: string): TObject | undefined {
        try {
            return JSON.parse(json) as TObject;
        }
        catch {
            return undefined;
        }
    }

    /**
     * Make a deep clone of an object
     * @param object the cloned object
     */
    public static cloneObject<TObject>(object: TObject): TObject | undefined {
        const json: string = JSON.stringify(object);

        return Utilities.deserializeFromJson<TObject>(json)
    }

    /**
     * Returns whether the string provided is empty
     * @param inputString 
     * @returns 
     */
    public static isEmptyString(inputString?: string): boolean {
        if (inputString && inputString.length > 0)
            return false;

        return true;
    }
}