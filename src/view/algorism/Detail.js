import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    
    function solution1(name) {
        let answer = 0;
    
        // 기본 셋팅
        const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const arr = name.split("");
        
        // 위아래 최소값 구하기
        for(let val of arr){
            let index = abc.indexOf(val);
            answer += index >= 13 ? 26 - index : index;
        }
        
        // 좌우 최소값 구하기
        // 좌, 우, 좌->우, 우->좌 4가지 방법이있고
        // A가 아닌 영문은 기준이 될수있음
        // 해당기준으로 모든 경우의 수를 구하여 그중에 최소값을 구하기
        let moveList = [];
        for(let i=1; i<arr.length; i++){
            if(arr[i-1] != "A"){
                
                let startNum = Math.min(i-1, arr.length - i + 1);
                
                let srr = arr.slice(0, i);
                let nrr = arr.slice(i, arr.length);
    
                let ssr = srr.concat(nrr);
                let nnr = srr.reverse().concat(nrr.reverse());
    
                let ssrCount = 0;
                let nnrCount = 0;
                
                console.log(ssr);
                console.log(nnr);
                console.log("-----------------------------------");
                
                for(let j=0; j<ssr.length; j++){
                    if(ssr[j] != "A") ssrCount = j;
                }
    
                for(let j=0; j<nnr.length; j++){
                    if(nnr[j] != "A") nnrCount = j;
                }
                
                moveList.push(Math.min(ssrCount, nnrCount) + startNum);
            }
        }
        
        answer += Math.min(...moveList);
        
        return answer;
    }
    
    console.log(solution1("JEROEN"));
    
    
    function solution2(numbers) {
        let answer = '';
        
        // string 으로 변환
        let arr = numbers.map(val => String(val));
        
        // 가장큰수가 되기 위해선 이어붙인 수중 큰것이 앞으로 오면됨
        arr.sort((a, b) => {
            if(a+b > b+a){
                return -1;
            }
            
            if(a+b < b+a){
                return 1;
            }
            
            return 0;
        })
    
        // 0000... 일때는 0, 아니면 이어붙인 값
        answer = arr[0] === "0" ? "0" : arr.join("");
    
        return answer;
    }
    
    function solution3(genres, plays){
        let answer = [];
        
        // 장르별로 묶기위하여 Set으로 중복제거
        let arr = new Set(genres);
        
        // 장르별 obj 공간을 만들어줌 [ name: 장르명, list: 노래가 들어갈 list, sum: 장르의 총 재생수 ]
        let obj = [];
        for(let val of arr){
            obj.push({name: val, list: [], sum: 0});
        }
        
        // 장르별 obj 공간에 노래들을 알맞게 넣어줌
        for(let i=0; i<genres.length; i++){
            for(let item of obj){
                if(item.name == genres[i]){
                    item.list.push({id: i, plays: plays[i]});
                    item.sum += plays[i];
                }
            }
        }
        
        // 1. 장르 총 재생수 대로 정렬
        obj.sort((a,b) => b.sum - a.sum);
    
        // 2. 장르의 노래 리스트중 재생수 대로 정렬, 재생수 같으면 id대로 정렬
        // 3. 정렬이 되었으니 0,1 번째 노래의 id를 넣어줌
        for(let item of obj){
            item.list.sort((a,b) => {
                if(a.plays > b.plays){
                    return -1;
                }
                if(a.plays < b.plays){
                    return 1;
                }
                if(a.id > b.id){
                    return 1;
                }
                if(a.id < b.id){
                    return -1;
                }
                return 0;
            });
    
            answer.push(item.list[0].id)
            if(item.list[1]) answer.push(item.list[1].id);
        }
        
        return answer;
    }
    
    
    
    const data = DataList.filter((value) => {
        return match.params.week == "week" + value.week;
    })[0];
    
    
    return (
        <>
        {data ? (
            <Wrap className="inner">
                <TopBack url="/algorism"/>
                <h2>{data.week}주차</h2>
                <ul className="list_box">
                    {data.list.map((value, index) => (
                        <li key={index}>
                            <a href={value.source} target="_blank"><Icon icon={faQuestionCircle}/> {value.quiz}</a>
                            <div className="pre_box">
                                <pre>{value.code}</pre>
                            </div>
                        </li>
                    ))}
                </ul>
            </Wrap>
        ) : (
            <NoPage />
        )}
        </>
    )
}

const Wrap = styled.div`

  h2 {
    font-size: 25px;
    margin: 0 0 30px 0;
  }
  
  .list_box {
    
    li {
      margin: 0 0 50px 0;
      
      a {
        display: inline-block;
        margin: 0 0 10px 0;
        font-size: 16px;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      .pre_box {
        background-color: rgba(251, 245, 180, 0.3);
        
        pre {
          margin: 0 0 0 -100px;
          font-size: 13px;
        }
      }
    }
  }
`;

export default Detail;