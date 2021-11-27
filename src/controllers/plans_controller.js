
const baseModels = require('../../models/base_response_model')
const Serializer = require('sequelize-to-json')

const PlanModel = require('../../models/plan_model')
const verifyToken = require('../controllers/token_controller')

const JSONScheme = {
    include: ['@all'],
    exclude: ['user_id', 'createdAt', 'updatedAt',],
};

module.exports = {

    async getPlanFromId(req, res) {
        const response = { ...baseModels.baseResponseModel }
        const errorResponse = { ...baseModels.baseErrorResponseModel };
        const userId = req.query.user_id;

        if (userId == null) {

            return baseModels.logError(errorResponse, response, 400, "A user ID is required for getting the plan", res);
        }

        verifyToken(req, res, errorResponse, response, async () => {
            const plan = await PlanModel.findOne({ where: { user_id: userId } });

            if (plan != null) {

                response.success = true;
                response.data = new Serializer(PlanModel, JSONScheme).serialize(plan);
                return res.status(200).json(response)


            } else {

                return baseModels.logError(errorResponse, response, 404, "Plan was not found", res);
            }
        });



    },

}



