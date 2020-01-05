import React from 'react'
import styled from 'styled-components'
import User from './User'

const Base = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`

const Users = (props) => {
  return (
    <Base>
      <h2>Users</h2>
      <List>
        {props.users.map((user) => <User key={user.id} user={user} />)}
      </List>
    </Base>
  )
}

export default Users