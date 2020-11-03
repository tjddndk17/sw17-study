import React from "react";
import styled from "styled-components"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons"

import DataList from '../../data/algorism'
import NoPage from '../NoPage'

const view = ({match}) => {
    
    const data = DataList.filter((value) => {
        return match.params.week == "week" + value.week;
    })[0];
    
    return (
        <>
        {data ? (
            <Wrap>
                <h2>{data.week}주차</h2>
                <ul className="list_box">
                    {data.list.map((value) =>
                        <li key={value.quiz}>
                            <a href={value.source} target="_blank"><Icon icon={faQuestionCircle}/> {value.quiz}</a>
                            <div className="pre_box">
                                <pre>{value.code}</pre>
                            </div>
                        </li>
                    )}
                </ul>
            </Wrap>
        ) : <NoPage/>}
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

export default view;