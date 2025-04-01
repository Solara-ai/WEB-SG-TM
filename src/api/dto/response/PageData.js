export class PageData {
    constructor(pageNo, elementPerPage, totalElements, totalPages, elementList) {
        this.pageNo = pageNo;
        this.elementPerPage = elementPerPage;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.elementList = elementList;
    }

    static fromJson(json) {
        return new PageData(
            json.pageNo ?? 0,
            json.elementPerPage ?? 25,
            json.totalElements ?? 0,
            json.totalPages ?? 1,
            Array.isArray(json.elementList) ? json.elementList : []
        );
    }
}
