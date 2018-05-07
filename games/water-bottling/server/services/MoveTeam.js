const utils = require('../utils')
const TransactionalService = require('./../../../../server/services/TransactionalService')
const socket = require('./../../../../server/sockets/publish')
const repository = require('./../repository')
const gameEnums = require('./../../enums')

module.exports = class MoveTeamService extends TransactionalService {
  schema() {
    return {
      type: 'Object',
      properties: {
        teamId: { type: 'integer', required: true, min: 1 },
        directionId: { type: 'integer', required: true, enum: gameEnums.DIRECTIONS.idsAsEnum },
        organizerId: { type: 'integer', required: true, min: 1 },
      },
    }
  }

  async run() {
    const dbTransaction = await this.createOrGetTransaction()
    const currentPosition = await repository.findTeamPosition(
      this.competitionId,
      this.data.teamId,
      dbTransaction,
    )
    const newPosition = move(this.data.directionId, currentPosition, this.data.organizerId)
    utils.validatePosition(newPosition)
    const position = await repository.addTeamPosition(newPosition, dbTransaction)
    await socket.publishDisplayChange({
      from: {
        vertical: currentPosition.vertical,
        horizontal: currentPosition.horizontal,
        power: currentPosition.power,
      },
      to: {
        vertical: position.vertical,
        horizontal: position.horizontal,
        power: position.power,
      },
    })
    return {
      horizontal: position.horizontal,
      vertical: position.vertical,
      power: position.power,
      possibleMoves: utils.getPossibleMoves(position),
    }
  }
}

function move(directionId, curPos, organizerId) {
  const direction = gameEnums.DIRECTIONS.ids[directionId]
  return {
    horizontal: curPos.horizontal + direction.horizontalChange,
    vertical: curPos.vertical + direction.verticalChange,
    power: curPos.power + direction.powerChange,
    teamId: curPos.teamId,
    competitionId: curPos.competitionId,
    previousPositionId: curPos.id,
    organizerId,
  }
}