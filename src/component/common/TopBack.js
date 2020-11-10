import React from "react"
import styled from "styled-components"
import {useHistory} from "react-router-dom"
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import * as sIcon from "@fortawesome/free-solid-svg-icons"


const TopBack = (props) => {
    
    const history = useHistory();
    
    function onBack(){
        return props.url ? history.push(props.url) : history.goBack();
    }
    
    return (
        <Wrap>
            <button onClick={onBack}>
                <Icon icon={sIcon.faArrowAltCircleLeft} />
            </button>
        </Wrap>
    )
}

const Wrap = styled.div`
  margin: 0 0 30px 0;
  
  button {
    font-size: 2.5rem;
  }

`

export default TopBack;