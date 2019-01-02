import React from 'react'
import PropTypes from 'prop-types'

// styles
import '../styles/Player.css'

const combiner = 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/'

const getAvatar = id => (
  `${combiner}${id}.png&w=350&h=350&scale=crop`
)

const Player = (props) => {
  const { player } = props
  return (
    <>
      <div className="headshot">
        <img
          height="55px"
          src={getAvatar(player.id)}
          alt="headshot"
          className="player-headshot rounded-circle"
        />
      </div>
      <div className="player-info">
        <div>
          {player.name}
        </div>
        <div>
          {`${player.position} ${player.number}`}
        </div>
        <div className="player-stats">
          {`${player.stats[0].abbreviation}: ${Math.round(player.stats[0].value)}`}
          {` ${player.stats[1].abbreviation}: ${Math.round(player.stats[1].value)}`}
          {` ${player.stats[2].abbreviation}: ${Math.round(player.stats[2].value)}`}
        </div>
      </div>
    </>
  )
}
Player.propTypes = {
  player: PropTypes.shape({
    headshot: PropTypes.string,
    position: PropTypes.string,
    number: PropTypes.string,
    stats: PropTypes.arrayOf(PropTypes.shape({
      abbreviation: PropTypes.string,
      value: PropTypes.number,
    })),
  }),
}


export default Player
