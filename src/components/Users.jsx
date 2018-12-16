import React, { useEffect, useState } from 'react'
import { useGlobal } from 'reactn'
import {
  Container,
  Table,
} from 'reactstrap'

// styles
import '../styles/Users.css'
import request from '../utils/request'

// local components
import Nav from './Nav'

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateString)
}

const Users = () => {
  const [user] = useGlobal('user')
  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    request.get('/api/users').then((data) => {
      setAccounts(data.users)
    })
  }, [])
  let adminMessage
  let userTable
  if (user) {
    if (user.isAdmin) {
      // Show Users console
      const userTableRows = accounts.map(account => (
        <tr>
          <th scope="row">
            <img alt="profile" height="50" src={account.photoURL.replace('normal', '400x400')} />
          </th>
          <td>{account.name}</td>
          <td>{account.isInvited.toString()}</td>
          <td>{account.isAdmin.toString()}</td>
          <td>{formatDate(account.lastLogin)}</td>
          <th>{account.id}</th>
        </tr>
      ))
      userTable = (
        <Table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Invited</th>
              <th>Admin</th>
              <th>Last Login</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {userTableRows}
          </tbody>
        </Table>
      )
    } else {
      // User is not admin
      adminMessage = 'You are not an admin'
    }
  } else {
    // Not logged in
    adminMessage = 'You are not logged in'
  }
  return (
    <>
      <Nav />
      <Container id="main">
        {adminMessage}
        {userTable}
      </Container>
    </>
  )
}

export default Users
