export interface NotificationSn{
    notificationSn:number;
}

export interface NotificationDto {
    notificationTitle:string;
    notificationContent:string;
    targetMembSn:number;
    notificationSn:number;
    frstRegistDt:Date;
    lastChangeDt:Date;
    useYn:string;
}


