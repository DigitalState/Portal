
export class ApiUtils {

    static getUuidFromUri(uri: string): string {
        const lastIndexOfSlash = uri.lastIndexOf('/');
        return lastIndexOfSlash > 0 ? uri.slice(lastIndexOfSlash + 1) : '';
    }
}