import React from 'react';

const TestPage = () => {
    // 테스트 1


    function add(x, y) {
        console.log(x + y);
    }
    setTimeout(add, 2000, 3, 4);


    // 테스트 1

    // 테스트 2


    // 테스트 2


    return (
        <div>
            <div>
                테스트1  setTimeout() 사용법 :
            </div>

            <div>
                테스트2 setInterval() 사용법:
            </div>


        </div>
    );
};

export default TestPage;