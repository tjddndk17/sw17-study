import React from "react";
import styled from "styled-components"
import { Link } from 'react-router-dom'

import DataList from '../../data/algorism'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'

const view = () => {
    
    return (
        <Wrap>
            <h2>javascript 알고리즘</h2>
            
            <ul className="list_box">
                {DataList.map((value) =>
                    <li>
                        <Link to={"/algorism/week" + value.week}><Icon icon={faDotCircle} size="xs" /> {value.week} 주차</Link>
                    </li>
                )}
            </ul>
        </Wrap>
    )
}

const Wrap = styled.div`

  h2 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
  
  .list_box {
    
    li {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 15px 0;

    }
  }
`;

export default view;