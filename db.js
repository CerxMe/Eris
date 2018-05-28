/*
 * Initilizes a database connection with Mongorito
 * - add all models to client.eris.models!
 * - configure database server to keep connections alive
 */

const {Database, Model} = require('mongorito')
module.exports = client => {
  client.eris.db = new Database(client.eris.config.mongourl)

  client.eris.db.connect()
      .then(
          () => console.log('Database connected')
      )
      .catch(
          e => console.error(`Database goofed: ${e}`)
      )
  client.eris.models = []

  class Member extends Model {}
  client.eris.models.Member = Member
  client.eris.db.register(Member)

  class ReactionStats extends Model {}
  client.eris.models.ReactionStats = ReactionStats
  client.eris.db.register(ReactionStats)
}
