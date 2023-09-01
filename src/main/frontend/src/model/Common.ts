export interface Pageable {
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PagingResponse {
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    empty: boolean;
}

export interface Member {
    useYn: string;
    frstRegistDt: string;
    lastChangeDt: string;
    frstRegistMembSn: number | null;
    lastChangeMembSn: number | null;
    memberSn: number;
    membCls: {
        useYn: string;
        frstRegistDt: string;
        lastChangeDt: string;
        cmmnCodeDetailSn: number;
        codeId: string;
        codeValue: string;
        codeValueNm: string;
    };
    membSttusCd: {
        useYn: string;
        frstRegistDt: string;
        lastChangeDt: string;
        cmmnCodeDetailSn: number;
        codeId: string;
        codeValue: string;
        codeValueNm: string;
    };
    membId: string;
    membPw: string;
    membNm: string;
    mobileNo: string | null;
    emailAddr: string;
    zipCd: string | null;
    zipAddr: string | null;
    detailAddr: string | null;
    lastLoginDt: string;
    profileImage: string;
    identityVerification: string;
    subscriptionMethod: string;
    membNcm: string | null;
    authorities: {
        authority: string;
    }[];
    moneyBlce: number;
    username: string;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    password: string;
}
