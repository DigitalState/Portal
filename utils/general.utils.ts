
export class GeneralUtils {

    /**
     * Parse a URL query string into an key/value object
     * @param queryString
     * @return {{}}
     */
    static parseQueryString(queryString): any {
        let params = {}, queries, temp, i, l;

        // If more than a query string is passed, ignore everthing before `?`
        const indexOfQuestionMark = queryString.indexOf('?');

        if (indexOfQuestionMark >= 0) {
            queryString = queryString.substring(indexOfQuestionMark + 1);
        }

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    }
}