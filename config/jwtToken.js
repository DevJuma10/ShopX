const jwt = require('jsonwebtoken');


const generateToken = async (id) => {

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const token = await jwt.sign( {id},jwtSecret,{expiresIn: '2d'} )

    return token;
}





module.exports = { generateToken }