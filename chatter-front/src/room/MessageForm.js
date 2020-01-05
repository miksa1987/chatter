import React from 'react'
import styled from 'styled-components'
import useField from '../util/useField'

const Base = styled.form`
  display: flex;
  flex-direction: column;
`

const MessageForm = (props) => {
  const [ message, resetMessage ] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.sendMessage(message.value)
    resetMessage()
  }

  return (
    <Base onSubmit={handleSubmit}>
      <input {...message} />
    </Base>
  )
}

export default MessageForm