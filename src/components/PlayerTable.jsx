import React from 'react'
import { useGlobal } from 'reactn'
import PropTypes from 'prop-types'
import {
  Table, Button,
} from 'reactstrap'

// styles
import '../styles/PlayerTable.css'

// local component

const PlayerTable = (props) => {
  const [user] = useGlobal('user')
  const { players } = props
  let adminMessage
  let userTable
  if (user) {
    if (user.isAdmin) {
      // Show Add Players console
      const playerTableRows = players.map(player => (
        <tr key={player.id}>
          <th scope="row">
            <img alt="profile" height="50" src={player.headshot} />
          </th>
          <td>{player.name}</td>
          <td>
            <img alt="team" className="team-logo" height="50" src={player.teamLogo} />
            {player.team}
          </td>
          <td>{player.position}</td>
          <td>{player.id}</td>
          <td>
            <Button close onClick={() => props.removePlayer(player.id)} />
          </td>
        </tr>
      ))
      userTable = (
        <Table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {playerTableRows}
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
      {adminMessage}
      {userTable}
    </>
  )
}

PlayerTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object),
  removePlayer: PropTypes.func,
}

export default PlayerTable
