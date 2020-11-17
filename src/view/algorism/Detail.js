import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    
    // 디스크 컨트롤러
    function solution1(jobs) {
        
        let count = jobs.length;
        let time = 0;
        let sum = 0;
        
        // 최초 정렬
        jobs.sort((acc,cur) => {
            return acc[0] === cur[0] ? acc[1] - cur[1] : acc[0] - cur[0];
        });
        
        while (jobs.length > 0) {
   
            // 진행가능한 job
            const job = jobs.filter(item => item[0] <= time);
            
            // 진행할 job
            let run = null;
  
            if (job.length > 0) {
                
                // 진행가능한 job중 소요시간이 가장 작은것
                job.sort((a,b) => a[1] - b[1]);
                let minIndex = jobs.findIndex(item => item === job[0]);
                run = jobs.splice(minIndex, 1)[0];
            } else {
                
                // 진행가능한 job 없으면 첫번째 job
                run = jobs.shift();
            }
            
            // 시간 계산
            sum += run[0] >= time ? run[1] : run[1] + time - run[0];
            time = run[0] >= time ? run[1] + run[0] : time + run[1];
        }
    
        return Math.floor(sum/count);
    }
    
    console.log(solution1([[0, 3], [1, 9], [2, 6]]));
    
    // 프린터
    function solution2(priorities, location) {
        let answer = 0;
        
        // 원래의 순번을 알기위해 2차원 배열로 변경
        let list = priorities.map((e,i)=>{
            return [e,i];
        })
        
        let index = 0;
        while(list.length > 0) {
            let num = list.splice(0, 1)[0];

            // 뒤에 큰값이 있으면 맨뒤로
            if(list.filter(e => e[0]>num[0]).length > 0){
                list.push(num);
            }
            // 뒤에 큰값이 없으면 출력
            else {
                index++;
                if(num[1] == location){
                    return index;
                }
            }
        }
    }
    
    console.log(solution2([2, 1, 3, 2], 2));
    
    // 여행경로
    function solution3(tickets){
        let answer = []
    
        // 최조 정렬
        tickets.sort();
        let done = false;
        
        // 최초 실행
        dfs('ICN', tickets, []);
    
        function dfs(departure, remain, route) {
        
            if (done) return;
        
            // 여행 가능한 경로
            const possibleTickets = remain.filter(item => item[0] === departure);
        
            possibleTickets.forEach(possibleTkt => {
            
                // array 복제
                let tmp_remain = Array.from(remain);
                let tmp_route = Array.from(route);
            
                // 해당 index
                const idx = tmp_remain.findIndex(item => item === possibleTkt);
                tmp_remain.splice(idx, 1);
            
                // 최종 여행경로 O
                if (tmp_route.length === tickets.length - 1) {
                    tmp_route = tmp_route.concat(possibleTkt);
                    done = true;
                    answer = tmp_route;
                }
                // 최종 여행경로 X
                else {
                    tmp_route.push(possibleTkt[0]);
                    dfs(possibleTkt[1], tmp_remain, tmp_route);
                }
            })
        }
    
        return answer;
    }

    
    console.log(solution3([["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]));
    
    
    
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