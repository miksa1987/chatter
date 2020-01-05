import React from 'react'
import styled from 'styled-components'

import Messages from './Messages'
import Users from './Users'
import MessageForm from './MessageForm'

const Base = styled.div`
  display: grid;
  grid-template: 1.5rem 1fr 1.5rem / 100%;
  height: calc(100vh - 1rem);
`

const Split = styled.div`
  display: grid;
  grid-template: 100% / 75% 25%;
`

const Room = (props) => {
  return (
    <Base>
      <strong>Room {props.room}</strong>
      <Split>
        <Messages messages={props.messages} />
        <Users users={props.users} />
      </Split>
      <MessageForm sendMessage={props.sendMessage} />
    </Base>
  )
}

export default Room