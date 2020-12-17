import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    

    let direction = {
        0 : [0,1],
        1 : [1,1],
        2 : [1,0],
        3 : [1,-1],
        4 : [0,-1],
        5 : [-1,-1],
        6 : [-1,0],
        7 : [-1,1],
    }
    
    function solution(arrows) {
        let answer = 0;
        let cp = [0,0]
        let nextP = cp;
        let visitedPath = {};
        let visitedLoc = {"0,0":1};
        
        arrows.map(arr=>{
            let a = direction[arr];
            function tmp(a){
                nextP = [cp[0]+a[0], cp[1]+a[1]];
                let path = [cp.join(",") , nextP.join(",")].sort().join(':');   // 1,2 : 2,1
                
                let isVisitedPath = false;
                if(visitedPath[path] == undefined){
                    visitedPath[path] = 1;
                    isVisitedPath = true;
                }
                
                let isVisitedLoc = true;
                if(visitedLoc[nextP.join(",")] == undefined){
                    visitedLoc[nextP.join(",")] =1;
                    isVisitedLoc = false;
                }
                if(isVisitedPath === true && isVisitedLoc === true){
                    answer+=1;
                }
                cp = nextP;
            }
            tmp(a);
            tmp(a);
        })
        return answer;
    }
    
    console.log(solution([6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0]));
    
    
    
    
    
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