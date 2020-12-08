import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    
    // 124 나라의 숫자
    function solution1(n) {
        let answer = '';
        
        // n/3의 나머지는 [1,2,0] 반복
        // 나머지가 0일때는 -1 해줘야함
        let list = [4,1,2];

        while(n){
            
            let r = n%3;
            
            if(r == 0){
                n = n/3 - 1;
            } else {
                n = Math.floor(n/3);
            }
    
            answer = list[r] + answer;
        }
        
        return answer;
    }
    
    
    // 2 x n 타일링
    // n3 = n2 + n1
    function solution2(n){
        let prev = 0;
        let curr = 1;
        let next = 1;
        
        for (let i = 0; i < n; i++) {
            next = (prev + curr) % 1000000007;
            prev = curr;
            curr = next;
        }
        
        return curr;
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