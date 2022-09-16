const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.get('/', function(req, res) {
  res.send('Get ready for OpenSea!');
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const nft = db[tokenId]
  // const bdayParts = person.birthday.split(' ')
  // const day = parseInt(bdayParts[1])
  // const month = parseInt(bdayParts[0])
  const data = {
    'name': nft.name,
    'attributes': {
      'level': nft.level,
      'speed': nft.speed,
      'health': nft.health,
      'strength': nft.strength
    },
    'image': `${HOST}/images/${tokenId}.png`
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})

