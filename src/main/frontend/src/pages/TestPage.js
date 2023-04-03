import React, {useState} from 'react';
import ConfirmComponent from "../component/ConfirmComponent";


const TestPage = () => {
    // 테스트 1 ----------------------------------------------------
    // 프로미스(Promise)
    // 싱글쓰레드인 자바스크립트에서 비동기 처리를 위해서 콜백(callback)을 사용해 옴.
    // 덕분에 비동기 처리를 온전히 해낼 수 있었지만 콜백이 사용되는 경우가 많아짐에 따라 단점이 드러남.
    // 단점 => 비동기 처리를 순차적으로 실행할 필요가 있는 경우에 비동기 처리를 중첩시켜서 표현하므로 에러,"예외처리가 어려움" 또한 중첩으로 "복잡도 증가"
    // 보완 => 프로미스
    const test1 = ()=>{
        let param = true;
        const promise1 = new Promise(function(resolve,reject){
            if(param){
                resolve("바보");
            }
            else{
                reject("아닌데");
            }
        });
        const promise2 = new Promise(function(resolve,reject){
            if(param){
                resolve("바보2");
            }
            else{
                reject("아닌데2");
            }
        });
        Promise.all([promise1,promise2]).then(function(values){
            console.log("1,2 모두완료",values);
        });



    }


    // 테스트 1 ----------------------------------------------------

    // 테스트 2 ----------------------------------------------------
    const test2 =()=>{

        function job(state) {
            return new Promise(function(resolve, reject) {
                if (state) {
                    resolve('success 성공');
                } else {
                    reject('error 실패');
                }
            });
        }

        let promise = job(true);
        console.log("==========")
        promise
            .then(function(data) { // A
                console.log(data);

                return job(false);
            })

            .catch(function(error) { // B
                console.log(error);

                return 'Error caught';
            })

            .then(function(data) { // C
                console.log(data);

                return job(false);
            })

            .catch(function(error) { // D
                console.log(error);
            })
            .then(function (data){
                console.log("==========")
            });
    }

    // 테스트 2 ----------------------------------------------------

    // 테스트 3 ----------------------------------------------------
    const test3 =() => {
        function job(state) {
            return new Promise(function(resolve, reject) {
                if (state) {
                    resolve('success !');
                } else {
                    reject('error !');
                }
            });
        }

        let promise = job(true);
        console.log("====test3=====")
        promise
            .then(function(data) { // A
                console.log(data + "A");

                return job(true);
            })

            .then(function(data) { // B
                if (data !== 'victory') {
                    throw 'Defeat B';
                }

                return job(true);
            })

            .then(function(data) { // C
                console.log(data + "C");
            })

            .catch(function(error) { // D
                console.log(error + "D");

                return job(false);
            })

            .then(function(data) { // E
                console.log(data + "E");

                return job(true);
            })

            .catch(function(error) { // F
                console.log(error + "F");

                return 'Error caught';
            })

            .then(function(data) { // G
                console.log(data + "G");

                return new Error('test');
            })

            .then(function(data) { // H
                console.log(data)
                console.log('Success:', data.message , "H");
            })

            .catch(function(data) { // I
                console.log('Error:', data.message , "I");
            })
            .then(function (data){
                console.log("==========")
            });
    }

    // 테스트 3 ----------------------------------------------------

    // 테스트 4 ----------------------------------------------------
    const [show,setShow] = useState(false);
    const test4 = () =>{
        console.log("confirm 오픈");
        setShow(true);
    }
    const rejectFunction=(props)=>{
        console.log(props)
        setShow(props);
    }
    // 테스트 4 ----------------------------------------------------

    // 테스트 5 ----------------------------------------------------
    const test5 =()=>{
        console.log("==========Async await 예제==========");


        // async 기본 예제
        async function greet() {
            // return 'hello';
            // 명시적으로 resolved promise 반환도 가능합니다.
            return Promise.resolve('hello');
        }
        greet().then(console.log);


        // Promise 객체 반환
        // console.log(greet());


        // 1.function 앞에 async를 선언한 함수는 항상 Promise 객체를 반환합니다.
        // 2.Promise가 아닌 값을 리턴하더라도 내부적으로 Promise로 감싸서 리턴합니다.
        function greet2() {
            return new Promise(function(resolve){
                setTimeout(function() {
                    resolve('hello');
                }, 5000);
            });
        }

        (async function() {
            var result = await greet2(); //resolved 될 때까지 대기
            console.log(result);
        })();





    }

    // 테스트 5 ----------------------------------------------------

    // 테스트 6 ----------------------------------------------------
    const test6 = ()=>{

    }

    // 테스트 6 ----------------------------------------------------


    return (
        <div>
            <div onClick={test1}>
                테스트1  Promise() 사용법 : O
                <hr/>
            </div>

            <div onClick={test2}>
                테스트2 Promise() 사용법: O
                <hr/>
            </div>

            <div onClick={test3}>
                테스트3 Promise() 사용법: O
                <hr/>
            </div>

            <div onClick={test4}>
                테스트4 Confirm 창 (확인,취소)
                <hr/>
            </div>
                {show?
                    <ConfirmComponent
                        confirmText={"이동을 하시겠습니까? \n 확인 또는 취소"}
                        successText={"확인(문구변경가능)"}
                        resolveFunction={"/"}
                        rejectFunction={rejectFunction} />
                    :
                    null
                }


            <div onClick={test5}>
                테스트5  async / await란 무엇인가
                <hr/>
            </div>

            <div onClick={test6}>
                테스트6
                <hr/>
            </div>

        </div>
    );
};

export default TestPage;