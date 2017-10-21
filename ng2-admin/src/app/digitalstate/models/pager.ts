/**
 * An object used to get pager information from the server
 */
export class Pager {
    // The number of items in the pager
    size: number = 20;
    // The total number of items
    totalItems: number = 0;
    // The total number of pages
    totalPages: number = 0;
    // The current pager number
    pageNumber: number = 0;
}

export enum PagingMode {
    REPLACE,
    APPEND,
}