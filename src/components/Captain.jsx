import React from 'react'
import PropTypes from 'prop-types'

// styles
import '../styles/Captain.css'

const Captain = (props) => {
  const { player } = props
  return (
    <div className="captain-profile">
      <div className="headshot">
        <img height="55px" src={player.headshot} alt="headshot" />
      </div>
      <span className="team-name">
        {`Team ${player.firstName}`}
      </span>
    </div>
  )
}
Captain.propTypes = {
  // Not sure how to make this one go away. Committing but adding a todo
  // TODO: Figure this out
  // eslint-disable-next-line react/require-default-props
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


export default Captain
