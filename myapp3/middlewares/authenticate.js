const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {

    try{
        
            token=req.headers.authorization.split(' ')[1]
            decode=jwt.verify(token, 'RESTFULAPIs');
            next();
        
    }
          
    catch(error){
        res.json({message:"Authentication failed"});
    }
        
    
}
module.exports = authenticate;

    
