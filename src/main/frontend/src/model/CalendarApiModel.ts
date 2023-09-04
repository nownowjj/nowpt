import {Member, PagingResponse} from "./Common";

export interface CalendarSnParam {
    calendarSn?: number;
}

export interface ImportParam extends CalendarSnParam{
    importYn: boolean;
}

export interface RecordDate {
    recordDate: string;
}

export interface NewRecordParam extends RecordDate,ImportParam{
    title: string;
    content: string;
    importYn: boolean;
}

export interface FixParam {
    titleValue: string; // Assuming titleValue is of type string
    contentValue: string; // Assuming contentValue is of type string
}

export interface CalenderDto{
    recordDate:string;
    memberSn:number;
    calendarSn:number;
    title:string;
    content:string;
    frstRegistDt:Date;
    lastChangeDt:Date;
    useYn:string;
    importYn:boolean;
}

export interface CalenderPagingDto extends PagingResponse{
    content: CalenderDto[];
}

export interface CalenderRecordSm{
    year:string;
    month:string;
    monthCount:number;
}


export interface CalenderMyInfoDto{
    member:Member[];
    myRecordSmList: CalenderRecordSm[];
}

