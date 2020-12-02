import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'
import TopBack from '../../component/common/TopBack'

const Detail = ({match}) => {
    
    // 해당 상황에 최선의 선택
    // 섬 연결
    function solution(n, costs) {
        let answer = 0;
        let island = [];    // 이어진 섬 정보
        let bridge = [];    // 지어진 다리 정보
        let total = 0;      // 지어진 다리 갯수
        
        // 비용 오름다차순
        costs.sort((a, b) => a[2] - b[2]);
        
        // 첫번째 값부터 담고 시작(가장 적은 비용이니까)
        island[costs[0][0]] = true;
        island[costs[0][1]] = true;
        bridge[0] = true;
        answer += costs[0][2];
        total += 2;
        
        //모든 다리를 다 지을때 까지
        while (total < n) {
            
            //전체 다리 정보를 순회
            for (let i = 1; i < costs.length; i++) {
                let [start, end, cost] = costs[i]
                
                // 1. 해당 다리를 짓지 않았고
                // 2-1. start 섬은 연결 된 상태에 end 섬은 연결 안된 경우
                // 2-2. 혹은 end 섬은 연결 된 상태에 start 섬은 연결 안된 경우
                if (
                    !bridge[i] &&
                    ((island[start] && !island[end]) || (!island[start] && island[end]))
                ) {
                    //해당 섬/다리/비용 정보 추가
                    island[start] = true
                    island[end] = true
                    bridge[i] = true
                    answer += cost
                    total++
                    break
                }
            }
        }
        
        return answer
    }
    
    
    // 다리를 지나는 트럭
    // 큐 - 먼저 넣은 데이터가 먼저 나오는 형태
    function solution1(bridge_length, weight, truck_weights) {
        let answer = 0;
    
        // 다리 현재 무게
        let bridgeWeight = 0;
    
        // 다리 상태 초기화
        let bridge = [];
        for(let i =0;i<bridge_length;i++){
            bridge.push(0);
        }
    
        // 대기트럭이 있거나 대기트럭이 끝났을땐 현재다리무게가 있어야함
        while(truck_weights.length > 0 || (bridgeWeight > 0 && truck_weights.length == 0)){
        
            // 마지막 지나감
            bridgeWeight -= bridge.pop();
        
            if(truck_weights.length){
            
                // 다음트럭
                let truck = truck_weights.shift();
            
                // 진입가능
                if(truck + bridgeWeight <= weight){
                    bridge.unshift(truck);
                    bridgeWeight += truck;
                }
                // 진입불가
                else {
                    bridge.unshift(0);
                    truck_weights.unshift(truck);
                }
            }
        
            answer++;
        }
    
        return answer;
    }
    
    
    console.log(solution1(2, 10, [7,4,5,6]));
    
    
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