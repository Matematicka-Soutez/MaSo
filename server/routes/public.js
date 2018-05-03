const Router = require('koa-router')
const teachers = require('./../handlers/public/teachers')
// const optionalToken = require('./../handlers/passport').optionalToken

const router = new Router()

/**
 * @api {post} /api/contact-us Contact Us Form
 * @apiName ContactUs
 * @apiGroup Forms
 *
 * @apiParam {String{1..130}}   firstName           User's first name.
 * @apiParam {String{1..130}}   lastName            User's last name.
 * @apiParam {String{1..256}}   email               User's email.
 * @apiParam {String{1..256}}   phone               User's phone.
 * @apiParam {String}           message             User's message.
 * @apiParam {String}           topic               User's topic.
 *
 */
// TODO router.post('/contact-us', optionalToken, cases.contactUs)

/**
 * @api {post} /api/session/admin Login admin
 * @apiName LoginAdmin
 * @apiGroup Admin
 *
 * @apiParam {String{1..256}}   username            Admin username to verify.
 * @apiParam {String{1..256}}   password            Admin password to verify.
 *
 * @apiSuccess {Number}         id                  Admin unique identifier.
 * @apiSuccess {String}         accessToken         Server issued access token.
 *
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 *
 */
router.post('/session/admin', teachers.adminLogin)

/**
 * @api {post} /api/session/user Login user
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String{1..256}}   username            User username to verify.
 * @apiParam {String{1..256}}   password            User password to verify.
 *
 * @apiSuccess {Number}         id                  User unique identifier.
 * @apiSuccess {String}         firstName           User first name.
 * @apiSuccess {String}         lastName            User last name.
 * @apiSuccess {Boolean}        confirmed           User has confirmed email.
 * @apiSuccess {String}         accessToken         Server issued access token.
 *
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 *
 */
router.post('/session/user', teachers.login)

/**
 * @api {POST} /api/users Sign Up
 * @apiName SignUp
 * @apiGroup Users
 *
 * @apiParam {String{1..40}}                firstName           User first name.
 * @apiParam {String{1..80}}                lastName            User last name.
 * @apiParam {String{1..80}}                email               User email.
 * @apiParam {String{1..256}}               password            User password.
 *
 * @apiSuccess (Created 201) {Number}       id                  User unique identifier.
 * @apiSuccess (Created 201) {String}       username            User username.
 * @apiSuccess (Created 201) {String}       firstName           User first name.
 * @apiSuccess (Created 201) {String}       lastName            User last name.
 * @apiSuccess (Created 201) {String}       email               User email.
 * @apiSuccess (Created 201) {Boolean}      confirmed           User has confirmed email.
 * @apiSuccess (Created 201) {Date}         createdAt           User createdAt timestamp, format: ISO-8601.
 * @apiSuccess (Created 201) {Date}         updatedAt           User updatedAt timestamp, format: ISO-8601.
 *
 * @apiUse BadRequestError
 * @apiUse WrongPasswordFormat
 * @apiUse ConflictError
 *
 */
router.post('/users', teachers.signUp)

/**
 * @api {PUT} /api/users/confirm Confirm user email address
 * @apiName ConfirmEmailAddress
 * @apiGroup Users
 *
 * @apiParam {String{1..256}}   token               Received token in confirm email.
 *
 * @apiSuccess {Number}         id                  User unique identifier.
 * @apiSuccess {String}         firstName           User first name.
 * @apiSuccess {String}         lastName            User last name.
 * @apiSuccess {String}         accessToken         Server issued access token.
 *
 * @apiUse BadRequestError
 * @apiUse ForbiddenError
 *
 */
router.put('/users/confirm', teachers.confirmEmail)

/**
 * @api {POST} /api/users/reset-password Initiates user password reset action
 * @apiName ResetPassword
 * @apiGroup Users
 *
 * @apiParam {String{1..80}}    email               Email address where to send reset password link.
 *
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse UnauthorizedError
 *
 */
router.post('/users/reset-password', teachers.resetPassword)

/**
 * @api {PUT} /api/users/reset-password Updates user password with new password
 * @apiName UpdatePassword
 * @apiGroup Users
 *
 * @apiParam {String{1..256}}               token               Received token in reset password email.
 * @apiParam {String{1..256}}               password            New password to update
 *
 * @apiUse BadRequestError
 * @apiUse ForbiddenError
 * @apiUse WrongPasswordFormat
 * @apiUse UnauthorizedError
 *
 */
router.put('/users/reset-password', teachers.updatePassword)

module.exports = router.routes()
