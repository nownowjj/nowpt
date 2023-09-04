let methodObj ={
    do:function (){
        console.log("응ㅇ애");
    },
    login:'/go/login'
}

const route = {
    notice:'/go/notice',
    search:'/search',
    calendar:'/calendar',
    calendarDayDetail:'/calendarDayDetail',
    myPage : '/go/common/myPage',
    login : '/go/login',
    calendarImport : '/calendarImport',
    scroll : '/scroll',
    calendarRecordNewOrFix : '/calendarRecordNewOrFix',
    notification : '/notification',
    friend : '/friend'
}


export {methodObj,route };