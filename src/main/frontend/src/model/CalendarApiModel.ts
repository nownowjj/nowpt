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