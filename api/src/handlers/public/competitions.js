'use strict'

const GetTimerService = require('../../services/competition/GetTimer')
const GetSchoolRegistrationsService = require('../../services/competition/GetSchoolRegistrations')
const RegisterSchoolTeamService = require('../../services/competition/RegisterSchoolTeam')
const appErrors = require('../../../../core/errors/application')
const responseErrors = require('../../../../core/errors/response')

async function getTimer(ctx) {
  try {
    ctx.body = await new GetTimerService().execute({})
  } catch (err) {
    if (err instanceof appErrors.NotFoundError) {
      throw new responseErrors.BadRequestError('Soutěž nebyla nalezena.')
    }
    throw err
  }
}

async function getSchoolRegistrations(ctx) {
  try {
    ctx.body = await new GetSchoolRegistrationsService().execute({
      schoolToken: ctx.params.schoolToken,
    })
  } catch (err) {
    if (err instanceof appErrors.NotFoundError) {
      throw new responseErrors.BadRequestError('Škola nebyla nalezena.')
    }
    throw err
  }
}

async function registerSchoolTeam(ctx) {
  try {
    ctx.body = await new RegisterSchoolTeamService().execute({
      schoolToken: ctx.params.schoolToken,
      teamName: ctx.request.body.teamName,
      competitionVenueId: parseInt(ctx.request.body.competitionVenueId),
      members: ctx.request.body.members.map(member => ({
        firstName: member.firstName,
        lastName: member.lastName,
        grade: parseInt(member.grade),
      })),
    })
  } catch (err) {
    if (err instanceof appErrors.NotFoundError) {
      throw new responseErrors.BadRequestError('Škola nebyla nalezena.')
    }
    if (err instanceof appErrors.CannotBeDoneError) {
      throw new responseErrors.ConflictError('V tuto chvíli nemůžete registrovat více než jeden tým na školu.') // eslint-disable-line max-len
    }
    throw err
  }
}

module.exports = {
  getTimer,
  getSchoolRegistrations,
  registerSchoolTeam,
}
