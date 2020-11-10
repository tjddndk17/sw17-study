import React from 'react';
import styled from "styled-components";
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome';
import * as sIcon from '@fortawesome/free-solid-svg-icons'

const NoData = (prop) => {
    
    return (
        <Wrap>
            <div className="empty_box">
                <Icon icon={sIcon.faExclamationCircle} />
                <span>{prop.text} 데이터가 없습니다.</span>
            </div>
        </Wrap>
    )
}

const Wrap = styled.div`
  padding: 50px 0;
  text-align: center;
  
  .empty_box {
    display: inline-block;
    padding: 40px 100px;
    font-size: 2rem;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    
    span {
      vertical-align: middle;
    }
    
    svg {
      margin: 0 5px 0 0;
      font-size: 2.5rem;
      vertical-align: middle;
    }
  }
`


export default NoData;