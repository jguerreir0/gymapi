const UserModel = require('../../models/user_model')
const bcrypt = require('bcrypt')
const baseModels = require('../../models/base_response_model')
const Serializer = require('sequelize-to-json')
const jwt = require('jsonwebtoken')

const JSONScheme = {
    include: ['@all'],
    exclude: ['createdAt', 'updatedAt', 'password'],
};


module.exports = {

    async signup(req, res) {
        const response = { ...baseModels.baseResponseModel }
        const errorResponse = { ...baseModels.baseErrorResponseModel };
        const { firstName, lastName, email, password } = req.body

        const foundUser = await UserModel.findOne({ where: { email: email } });

        if (foundUser != null) {

            return logError(errorResponse, response, 409, "User already exists", res);

        } else {
            bcrypt.hash(password, 10, (err, encryptedPassword) => {
                if (err) {
                    return logError(errorResponse, response, 500, "Could not encrypt password", res);
                }
                else {
                    UserModel.create({ email: email, password: encryptedPassword, first_name: firstName, last_name: lastName, img_avatar: null }).then((value) => {
                        response.success = true;
                        response.data = new Serializer(UserModel, JSONScheme).serialize(value);
                        return res.status(201).json(response)
                    }).catch(
                        err => {
                            return logError(errorResponse, response, 500, err, res);
                        }
                    );
                }
            })
        }
    },

    async login(req, res) {
        const response = { ...baseModels.baseResponseModel }
        const errorResponse = { ...baseModels.baseErrorResponseModel };
        const { email, password } = req.body
        const foundUser = await UserModel.findOne({ where: { email: email } });

        if (foundUser != null) {

            bcrypt.compare(password, foundUser.password, (error, matchPassword) => {

                if (error) {
                    return logError(errorResponse, response, 401, "Authentication failure, please re-enter your credentials or contact customer support", res);
                }

                if (matchPassword) {
                    const token = jwt.sign({ email: foundUser.email, userId: foundUser.id }, process.env.JWTKEY, {
                        expiresIn: "1h"
                    });
                    response.success = true;
                    response.data = { ...new Serializer(UserModel, JSONScheme).serialize(foundUser), token: token };

                    return res.status(200).json(response)
                }


                return logError(errorResponse, response, 401, "Authentication failure, please re-enter your credentials or contact customer support", res);


            });


        } else {
            return logError(errorResponse, response, 401, "Authentication failure, please re-enter your credentials or contact customer support", res);
        }
    }
}



