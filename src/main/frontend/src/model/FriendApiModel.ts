export interface FriendUpdateParam{
    friendSn:number;
    acceptYn:boolean;
}

export interface FriendMemberSn{
    friendMemberSn:number;
}

export interface FriendDto{
    acceptYn:boolean;
    friendMemberSn:number;
    friendNm:string;
    friendProfile:string
    friendSn:number;
    frstRegistDt:Date;
    memberSn:number;
    requestStatus?:string;
}