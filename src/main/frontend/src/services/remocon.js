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
}

const isNotLogin = err => {
    console.log(err);
    if(err.code === '4444') {
        return true;
    }
}

export {methodObj,route , isNotLogin};