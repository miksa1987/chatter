import React, { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import useSocket from 'use-socket.io-client'

import Login from './login/Login'
import Room from './room/Room'

const App = () => {
  const [ name, setName ] = useState(null)
  const [ room, setRoom ] = useState(null)

  const [ messages, setMessages ] = useImmer([])
  const [ users, setUsers ] = useImmer([])

  const [ socket ] = useSocket(process.env.REACT_APP_API_URL)

  useEffect(() => {
    socket.on('message que', (nick, message) => {
      console.log(nick, message)
    })
    socket.on('update', (message) => {
      console.log(message)
    })
    socket.on('people-list', (people) => {
      console.log(people)
      let usersArray = []

      for (let key of Object.keys(people)) {
        usersArray = usersArray.concat(people[key]) 
      } 

      setUsers(() => usersArray)
    })
    socket.on('add-person', (nick, id) => {
      setUsers(users => [ ...users, { nick, id }])
    })
    socket.on('remove-person', (id) => {
      setUsers(users => users.filter((user) => user.id !== id))
    })
    socket.on('chat message', (nick, message) => {
      setMessages(messages => [ ...messages, { nick, message } ])
      const messageBox = document.getElementById('messages-box')
      messageBox.scrollTop = messageBox.scrollHeight + 30
    })
  }, [])

  const setUser = (name, room) => {
    setName(name)
    setRoom(room)

    socket.emit('join', name, room)
  }
  
  const sendMessage = (message) => {
    socket.emit('chat message', message, room)
  }

  return (
    <div>
      {!name && <Login setUser={setUser} />}
      {name && <Room messages={messages} users={users} sendMessage={sendMessage} room={room} />}
    </div>
  )
}

export default App;
