const jwt = require('jsonwebtoken');
require("../controllers/user");
require('dotenv').config();

// exportation du proces d'authentification
module.exports = (req, res, next) => {
    
    try {
        
        const token = req.headers.authorization.split(' ')[1];
         
        
        const decodedToken = jwt.verify(token, process.env.SECRET);


        const userId = decodedToken.userId; 
        
        if (req.body.userId && req.body.userId !== userId) {
        
        throw 'L\'identifiant de l\'utisateur n\'est pas valide';

        } else {
            next();
        }

    } catch (error) {

        res.status(401).json({
            error:('La requête n\'est pas validé!')
        });
    }
};