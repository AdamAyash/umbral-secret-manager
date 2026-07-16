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
}