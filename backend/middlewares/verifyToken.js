import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({message: 'Accés interdit, token manquant.'}); 
    }

    jwt.verify(token,process.env.jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'token invalide.'});
        }

        req.userID = decoded.id;
        next();
    });
}