const db = require('./../database')
const appErrors = require('./../utils/errors/application')
const parsers = require('./repositoryParsers')

module.exports = {
  findById,
  findByName,
}

async function findById(id, dbTransaction) {
  const team = await db.Team.findById(id, { transaction: dbTransaction })
  if (!team) {
    throw new appErrors.NotFoundError()
  }
  return parsers.parseTeam(team)
}

async function findByName(name, dbTransaction) {
  const team = await db.Team.findOne({
    where: { name },
    transaction: dbTransaction,
  })
  if (!team) {
    throw new appErrors.NotFoundError()
  }
  return parsers.parseTeam(team)
}