import React from 'react'
import styled from 'styled-components'

const Base = styled.div`
  display: flex;
  justify-items: flex-start;
`

const User = (props) => {
  return (
    <Base>
      <strong>{props.user.nick}</strong>
    </Base>
  )
}

export default User