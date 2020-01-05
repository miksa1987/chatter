import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const Base = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100vh - 6rem);
`

const Messages = (props) => {
  return (
    <Base id='messages-box'>
      {props.messages.map((message, idx) => <Message key={idx} message={message} />)}
    </Base>
  )
}

export default Messages