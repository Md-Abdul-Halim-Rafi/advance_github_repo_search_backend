const { Joi, Segments } = require("celebrate");

const searchedRepositories = {
    [Segments.QUERY]: Joi.object().keys({
        q: Joi.string().required().messages({
            "string.empty": "Search text is required",
            "string.required": "Search text is required"
        })
    })
}

module.exports = { searchedRepositories };