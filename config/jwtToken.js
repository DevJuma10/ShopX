const jwt = require('jsonwebtoken');

const generateToken = async (id) => {
    /**
     * Generates a JSON Web Token (JWT) using the provided id.
     * 
     * @param {string} id - The id to be included in the JWT payload.
     * @returns {Promise<string>} - A signed JWT with an expiration time of 2 days.
     * @throws {Error} - If JWT secret is missing or empty.
     */
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length === 0) {
        console.log(process.env.JWT_SECRET)
        throw new Error('JWT secret is missing or empty');
    }
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '2d'}
    )
}


module.exports = { generateToken }