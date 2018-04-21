const {Database, Model} = require('mongorito')
module.exports = client => {
  client.eris.db = new Database(client.eris.config.mongourl)
  class Member extends Model {}
  client.eris.db.register(Member)
  client.eris.db.connect()
      .then(
          () => console.log('Database connected')
      )
      .catch(
          e => console.error(`Database goofed: ${e}`)
      )
}
