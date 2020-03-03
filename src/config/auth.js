import jsonWebToken from 'jsonwebtoken';

function auth(req, res, next) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({message: "No token found in headers, authorization refused"});
    token = token.replace(/Bearer /g, '');

    try {
        //verify token and add user from payload
        req.user = jsonWebToken.verify(token, 'monsecret');
        next();
    } catch (error) {
        res.status(403).json({'message': 'Token is not valid.'});
    }
}

export default auth;
