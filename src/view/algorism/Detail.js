import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    
    // 체육복
    // 각단계에서 가장 최선의 선택을 하는 기법
    // 미래를 생각하지 않음으로 통하지 않는 경우가 있음
    function solution(n, lost, reserve) {
        let answer = 0;
        
        let list = [];
        for(let i=1; i<=n; i++){
            let item = 1;
            
            if(lost.indexOf(i) >= 0){
                item--;
            }
            
            if(reserve.indexOf(i) >= 0){
                item++;
            }
            
            list.push(item);
        }
        
        for(let i=0; i<list.length; i++){
            let u = list[i];
            
            if(u == 0){
                if(i > 0){
                    if(list[i-1] > 1){
                        list[i-1] = 1;
                        u = 1;
                    }
                }
                
                if(u == 0 && i<list.length){
                    if(list[i+1] > 1){
                        list[i+1] = 1;
                        u = 1;
                    }
                }
            }
            
            if(u>0){
                answer++;
            }
        }
        
        return answer;
    }
    
    console.log(solution(5, [2,4], [3]));
    
    
    
    // 자동완성
    function solution1(words) {
        let answer = 0;
        
        for(let item of words){
            let check = '';
    
            for(let i=0; i<item.length; i++){
                check += item[i];
                let count = words.filter((word) => {
                    return word.slice(0, i+1) == check;
                }).length;
        
                if(count == 1){
                    break;
                }
            }
    
            answer += check.length;
        }
        
        return answer;
    }
    
    console.log(solution1(['word','war','warrior','world']));
    

    
    
    
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