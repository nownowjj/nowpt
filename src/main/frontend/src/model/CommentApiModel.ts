export interface CommentDto{
    calendarSn:number;
    commentContent:string;
    membSn:number;
    profileImage?:string;
    membNm:string;
    frstRegistDt:Date;
    // lastChangeDt?:Date;
    useYn:string;
    commentSn:number;
}

export interface CommentParam{
    commentContent:string;
    calendarSn:number;
}