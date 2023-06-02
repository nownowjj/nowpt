import React from "react";

export function test8 () {
    new Promise(function(resolve, reject) {

        setTimeout(() => reject(1), 1000); // (*)

    }).then(function(result) { // (**)

        console.log(result); // 1
        return result * 2;

    }).then(function(result) { // (***)

        console.log(result); // 2
        return result * 2;

    }).then(function(result) {

        console.log(result); // 4
        return result * 2;
    }).catch(function (result) {
        console.log(`ㅈㄹㄹㅈㄹ ${result} <br/> dd`)
        return result;
    }).finally((result)=>{
        console.log(`마지막 ${result}`);
    });
}

export function test9(){
    const arr = [1, 3, 5, 1 ,5 ,7];
    const arrFlat = [1, 3, 5, 1 ,[[13 ,7]]];
    const arr2 = ['d', 'e', 'f'];
    const arr2Keys = [{'a':'aa'},{'b':'bb'}];

    console.log('===============');
    console.log('find'          ,arr.find((element) => element < 5)); // find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
    console.log('findIndex'          ,arr.findIndex((element) => element > 3)); // findIndex()메서드는 제공된 테스트 기능을 충족하는 배열의 첫 번째 요소 인덱스를 반환합니다. 테스트 기능을 만족하는 요소가 없으면 -1이 반환됩니다.
    console.log('findLast'      ,arr.findLast((element) => element !== 1) ); // findLast() 메서드는 배열을 역순으로 반복하고 제공된 테스트 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 테스트 함수를 만족하는 요소가 없다면 undefined가 반환될 것입니다.
    console.log('findLastIndex' ,arr.findLastIndex((element) => element > 3)); // findLastIndex()메서드는 배열을 역순으로 반복하고 제공된 테스트 기능을 만족하는 첫 번째 요소의 인덱스를 반환합니다. 테스트 기능을 만족하는 요소가 없으면 -1이 반환됩니다.
    console.log('at'            ,arr.at(2) , arr.at(-1)); // at()메서드는 정수 값을 사용하고 양수 및 음수 정수를 허용하는 해당 인덱스의 항목을 반환합니다. 음의 정수는 배열의 마지막 항목부터 다시 계산됩니다.
    console.log('concat'        ,arr.concat(arr2)); // concat()방법은 둘 이상의 배열을 병합하는 데 사용됩니다. 이 메서드는 기존 배열을 변경하지 않고 대신 새 배열을 반환합니다.
    console.log('every'        ,arr.every((element) => element < 5)); // every()는 배열의 모든 요소가 제공된 함수에 의해 구현된 테스트를 통과하는지 여부를 테스트합니다. 부울 값을 반환합니다.
    // console.log('fill'        ,arr.fill(5 ,1 ,3)); // fill()메서드는 배열의 모든 요소를 시작 인덱스(기본값 0)에서 끝 인덱스(기본값 array.length)까지 정적 값으로 변경합니다. 수정된 배열을 반환합니다.
    console.log('filter'        ,arr.filter((element) => element > 3)); // filter() 제공된 함수에 의해 구현된 테스트를 통과하는 주어진 배열의 요소로만 필터링된 지정된 배열 부분의 얕은 복사본을filter() 만듭니다 .
    console.log('flat'        ,arrFlat.flat(1)); // filter() 제공된 함수에 의해 구현된 테스트를 통과하는 주어진 배열의 요소로만 필터링된 지정된 배열 부분의 얕은 복사본을filter() 만듭니다 .
    console.log('flatMap'        ,arr2.flatMap((element) => (element === 'd' ? ['A'] : 'B') )); // flatMap()메서드는 배열의 각 요소에 지정된 콜백 함수를 적용한 다음 결과를 한 수준씩 평면화하여 형성된 새 배열을 반환합니다.
    arr2.forEach(element => console.log(`forEach ${element}`)); // 이 forEach()메서드는 각 배열 요소에 대해 제공된 함수를 한 번 실행합니다.
    console.log('from'        ,Array.from('ABC')); // 정적 메서드는 반복 가능하거나 배열 과 같은 객체 에서 Array.from()얕은 복사된 새 인스턴스를 만듭니다 .Array
    console.log('includes'        ,arr2.includes('e') , arr2.includes('a')); // includes()메서드는 배열이 항목 중 특정 값을 반환 true하거나 false적절하게 포함하는지 여부를 결정합니다.
    console.log('isArray'        ,Array.isArray([1])); // 정적 Array.isArray()메서드는 전달된 값이 Array.
    console.log('join'        ,arr2.join() , arr2.join('') , arr2.join('-')); // 이 메서드는 쉼표 또는 지정된 구분 문자열로 구분된 배열(또는 배열과 유사한 객체join() ) 의 모든 요소를 ​​연결하여 새 문자열을 만들고 반환합니다
    console.log('map'        ,arr2.map(element => `map~${element}`) ); //  map()메서드는 호출 배열의 모든 요소에서 제공된 함수를 호출한 결과로 채워진 새 배열을 만듭니다 .
    console.log('of'        ,Array.of('hi','hello' )); //  정적 메서드는 인수의 수나 유형에 관계없이 가변 개수의 인수에서 Array.of()새 인스턴스를 만듭니다
    console.log('pop'        ,arr2.pop()); //  이 메서드는 배열에서 마지막pop() 요소를 제거 하고 해당 요소를 반환합니다. 이 메서드는 배열의 길이를 변경합니다.
    console.log('pop',arr2);
    console.log('push'        ,arr2.push('f')); //  이 push()메서드는 지정된 요소를 배열 끝에 추가하고 배열의 새 길이를 반환합니다.
    console.log('push',arr2);

    const sumWithInitial = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
    const sumWithInitial2 = arr.reduce(function(accumulator, currentValue, currentIndex,array){
        return accumulator + currentValue;
    },10);

    console.log('reduce',sumWithInitial); //reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
    console.log('reduce',sumWithInitial2); //reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
    console.log('reduceRight',arrFlat.reduceRight((accumulator, currentValue) => accumulator.concat(currentValue)));
    console.log('shift'        ,arr2.shift() , arr2); // shift() 메서드는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다. 이 메서드는 배열의 길이를 변하게 합니다.
    arr2.push('zz'); //  이 push()메서드는 지정된 요소를 배열 끝에 추가하고 배열의 새 길이를 반환합니다.
    console.log('slice'        ,arr2.slice(1) , arr2); // slice() 메서드는 어떤 배열의 begin 부터 end 까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
    console.log('some'       ,arr ,arr.some(element => element === 9 )); // some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 만약 배열에서 주어진 함수가 true을 반환하면 true를 반환합니다. 그렇지 않으면 false를 반환합니다. 이 메서드는 배열을 변경하지 않습니다.
    console.log('sort'       ,arr.sort()); // sort() 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다. 정렬은 stable sort가 아닐 수 있습니다. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다.
    console.log('splice'      ,arr ,'|',arr.splice(0,0 , 'ABC'), arr); // splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다.
    console.log('toString'      ,arr.toString()); // toString()메서드는 지정된 배열과 해당 요소를 나타내는 문자열을 반환합니다.
    console.log('values'      ,arr.values()); // values()메서드는 배열의 각 항목 값을 반복하는 values()새 배열 반복자 개체를 반환합니다.
    const iterator = arr.values();
    for (const value of iterator){
        console.log(`value!! -> ${value}`);
    }
}


export function test10(){
    function bubbleSort (array) {
        console.log(`${array.length}`);
        for(let i=0; i<array.length; i++){
            let swap;
            for(let j=0; j<array.length-1-i; j++){
                if(array[j]>array[j+1]){
                    swap = array[j];
                    array[j] = array[j+1];
                    array[j+1] = swap;
                }
            }
            console.log(`${i}회전 : ${array}`)
            if(!swap){
                break;
            }
        }
        return array;
    }
    console.log(bubbleSort([5,7,3,4,1,6,2]));
}

export function test11(){
    console.log("================");
    console.log(document.URL);
    console.log(document.referrer);
    console.log(document.readyState);
    console.log(document.cookie);
    console.log(document.body);
    console.log(document.characterSet);
    console.log(document.textContent);
    console.log("================");
}

export function test12(){

    let a = 	["leo", "kiki", "eden","leo"];
    let b = 	["eden", "kiki"];

    let c = ["marina", "josipa", "지원","nikola", "vinko", "filipa"] ; let d=["josipa", "filipa", "marina", "nikola"]
    let e = ["mislav", "stanko", "mislav", "ana"]; let f=["stanko", "ana", "mislav"]
    solution(a,b);
    solution(c,d);
    solution(e,f);

    function solution(participant , completion){
        console.log("=========================");
        console.log(participant);
        console.log(completion);
        //participant 참가자
        //completion  완주자
        let obj = {};
        participant.forEach((player,index) => {
            if(obj[player] > 0){
                console.log(player + ":" + index);
                console.log(obj[player]);
                obj[player]++;
            }else{
                console.log(player + ":::" + index);
                console.log("아아"+obj[player]);
                obj[player] = 1;
            }
        })
        completion.forEach((player,index) => {
            console.log(player + ":::::" + index);
            obj[player]--;
        })
            console.log("(~˘▾˘)~");
        console.log(Object.keys(obj).filter(player => obj[player] > 0).toString('') + " last");
        return Object.keys(obj).filter(player => obj[player] > 0).toString('');

    }
}

export function test13(){
    console.log(`======================`);
    let config = {min : 10}
    console.log(`origin config : ${JSON.stringify(config)}`);
    config.min ??= 30;
    config.max ??= 120;
    console.log(`after config : ${JSON.stringify(config)}`);

    // numeric seperator
    let price = 1_000_000;
    console.log(`price : ${price}`);

    const array = [1,1,2,3,4,4,6,7,7];
    const setArray = [...new Set(array)]
    console.log(array);
    console.log(setArray);

    const One = [1,2,3];
    const Two = [4,5,6];
    const Hap = [... One , ...Two];
    console.log(`Hap : ${Hap}`);

    // 전개구문
    const myObject1 = {
        laptop: 'MacBook Pro',
        tablet: 'iPad Pro 11'
    }
    const myObject2 = {
        ...myObject1,
        phone: 'Galaxy Note 10'
    };
    console.log(myObject1); // {laptop: "MacBook Pro", tablet: "iPad Pro 11"}
    console.log(myObject2); // {laptop: "MacBook Pro", tablet: "iPad Pro 11", phone: "Galaxy Note 10"}

    console.log(`======================`);
}