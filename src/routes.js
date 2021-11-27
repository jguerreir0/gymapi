const router = require('express').Router()

///Controller imports
const UserController = require('./controllers/user_controller');
const PlanController = require('./controllers/plans_controller')

router.post('/login', UserController.login)
router.post('/signup', UserController.signup)
router.get('/plan', PlanController.getPlanFromId)


module.exports = router