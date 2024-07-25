export interface SearchResultData {
    address_name:string;
    category_group_code:string;
    category_group_name:string;
    category_name:string;
    distance:string;
    id:string;
    phone:string;
    place_name:string;
    place_url:string;
    road_address_name:string;
    x:string;
    y:string;
}

export interface SearchResultStatus {
    status:string;
}

export interface SearchResultPagination {
    current:number;
    first:number;
    gotoFirst:()=>void;
    gotoLast:()=>void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    last:number;
    nextPage:()=>void;
    perPage:number;
    prevPage:()=>void;
    totalCount:number;
    gotoPage(page: number): void;
}

export const markerImgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";