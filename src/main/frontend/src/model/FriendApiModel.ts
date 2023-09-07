export interface FriendUpdateParam extends FriendSn{
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

export interface FriendSn{
    friendSn:number;
}