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

export interface CalendarDto{
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

export interface CalendarPagingDto extends PagingResponse{
    content: CalendarDto[];
}

export interface CalendarRecordSm{
    year:string;
    month:string;
    monthCount:number;
}


export interface CalendarMyInfoDto{
    member:Member[];
    myRecordSmList: CalendarRecordSm[];
}

