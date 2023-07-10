import React, {useEffect, useState} from 'react';
import trainData from './trainData.json';

const SearchPage = () => {
    const [keyWord , setKeyWord] = useState('');
    const [data , setData] = useState([]);

    useEffect(()=>{
        const htmlString = `<li class='word-element'>입력해라</li>`;
        setKeyWord(htmlString);


    },[])


    class Node {
        constructor(value="") {
            this.value = value;
            this.children = new Map();
        }
    }

    class Trie {
        constructor(){
            this.root = new Node();
        }
        insert(string){
            // console.log("trie insert string : " , string);
            let currentNode = this.root;
            for(const char of string){
                if(!currentNode.children.has(char)){
                    currentNode.children.set(
                        char,
                        new Node(currentNode.value + char)
                    );
                }
                currentNode = currentNode.children.get(char);
            }
        }
    }


    let obj = trainData.DATA
    const station_name = obj && obj.map((station) => station.station_nm);
    const trie = new Trie();
    station_name.forEach((station)=>{
        trie.insert(station)
    })


    // const keywords = document.querySelector('.keywords');
    const $ul = document.querySelector('.ulList');
    // inputBox.addEventListener('input', checkInput);
    const inputBox = document.querySelector('.inputBox');
    const checkInput = (e) => {
        const inputvalue = e.target.value;
        console.log('checkInput value : ' , inputvalue);
        if (inputvalue == null || inputvalue == undefined) {
            $ul.textContent="";
            return false;
        }
        loadAutoFill(inputvalue);
    }

    const loadAutoFill = (input) => {
        let autocomplete = new AutoComplete(trie);
        console.log('loadAutoFill' , input);
        const arr = autocomplete.print(input)
        console.log(trie);
        console.log(arr.length);
        if (arr.length > 60){
            // 검색 단어로 조회한 결과가 없거나 너무 클때
                $ul.innerHTML =`<li class='word-element'>찾는 역이 없습니다. ${arr.length}</li>`;
                return false;
        }
        console.log("fillHTML before arr : " ,arr);
        fillHTML(arr);
    }

    const fillHTML = (arr) => {
        console.log('fillHtml',arr);
        // if(keywords) {
        //     console.log(keywords);
        //     keywords.textContent = "";
        // }
        // const $ul = document.querySelector('.ulList');
        if (!arr){
            $ul.textContent = ``;
            return false;
        }
        $ul.innerHTML =
            `
        ${arr && arr.map(el =>
                        `<li class='word-element'>${el}역</li>`).join('')}`
    }



    class AutoComplete {
        constructor(trie){
            this.root = trie.root;
            this.wordlist = [];
        }
        print(string){
            this.wordlist =[];
            const queue = new Queue();
            let currentNode = this.root;
            for (const char of string){
                if(currentNode.children.has(char)){
                    currentNode = currentNode.children.get(char);
                }
            }
            currentNode.children.forEach((node)=> {
                queue.enqueue(node);
            })
            if (currentNode.children && currentNode.children.size === 0){
                if (string.length > currentNode.value.length)
                    return
                queue.enqueue(currentNode.value)

            }
            while(queue.size){
                currentNode = queue.dequeue();
                if (currentNode.children && currentNode.children.size === 0){
                    this.wordlist.push(currentNode.value);
                }
                else {
                    currentNode.children.forEach((node)=> {
                        queue.enqueue(node);
                    })
                }
            }
            return this.wordlist
        }
    }

    class Queue {
        constructor(){
            this.queue = [];
            this.front = 0;
            this.rear = 0;
            this.size = 0;
        }
        enqueue(node){
            this.size += 1;
            this.queue[this.rear++] = node;
        }
        dequeue(){
            const value = this.queue[this.front];
            delete this.queue[this.front];
            this.front += 1;
            this.size -= 1;
            return value;
        }
    }


    return (
        <div>
            <input onChange={checkInput} className="inputBox"/>

            <ul className='ulList' dangerouslySetInnerHTML={{__html:keyWord}}>
            </ul>

            <p className="keywords"></p>
        </div>
    );
};

export default SearchPage;