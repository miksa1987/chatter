import React from 'react'
import styled from 'styled-components'
import useField from '../util/useField'

const Base = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 1rem);
`

const Login = (props) => {
  const [ name, resetName ] = useField('text')
  const [ room, resetRoom ] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()

    props.setUser(name.value, room.value)
  }

  return (
    <Base onSubmit={handleSubmit}>
      <input placeholder='Display name' {...name} />
      <input placeholder='Room to join' {...room} />
      <button type='submit'>Join chat</button>
    </Base>
  )
}

export default Login