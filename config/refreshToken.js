const jwt = require('jsonwebtoken');


const generateRefreshToken = async (id) => {

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const token = jwt.sign( {id},jwtSecret,{expiresIn: '72h'} )

    return token;
}



module.exports = { generateRefreshToken }