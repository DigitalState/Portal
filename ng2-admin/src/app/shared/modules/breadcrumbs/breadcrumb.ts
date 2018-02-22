
export interface Breadcrumb {
    link: string,
    title: { [lang: string]: string },
    subtitle?: { [lang: string]: string },
    tags?: Array<string>,
    data?: any,
    routeData?: any,
}