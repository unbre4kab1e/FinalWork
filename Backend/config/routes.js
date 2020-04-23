/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
	'POST /users/login': 'UserController.login',
	'POST /users/registration': 'UserController.registration',
	'GET /users/getUsersList': 'UserController.getUsersList',
	'POST /users/adduser': 'UserController.adduser',
};
