export interface CalendarSnParam {
    calendarSn: number|null;
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