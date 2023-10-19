const jwt = require('jsonwebtoken');


const generateToken = async (id) => {

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const token = jwt.sign( {id},jwtSecret,{expiresIn: '24h'} )

    return token;
}





module.exports = { generateToken }