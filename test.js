const chai = require('chai')
const chaiHttp = require('chai-http')
const dotenv = require('dotenv')
const app = require('./server/server')

dotenv.config()

const { expect } = chai

chai.use(chaiHttp)

describe('Player', () => {
  describe('/api/players', () => {
    it('gets the player data', (done) => {
      chai.request(app)
        .get('/api/players')
        .end((err, res) => {
          const expected = [
            'conference',
            'firstName',
            'headshot',
            'id',
            'lastName',
            'name',
            'number',
            'position',
            'stats',
            'team',
            'teamLogo',
          ]
          const keys = Object.keys(res.body.players[0]).sort()

          expect(keys).to.deep.equal(expected)
          done()
        })
    })
  })
})
