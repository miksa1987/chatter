import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  display: flex;
  justify-items: flex-start;
`

const Message = (props) => {
  return (
    <Base>
      <strong>{`< ${props.message.nick} > `}</strong>
      {props.message.message}
    </Base>
  )
}

export default Message
