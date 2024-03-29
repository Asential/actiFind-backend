import jwt from "jsonwebtoken";

const secret = 'MY_SUPER_DUPER_HIT_SECRET_KEY';

// Middleware basically authenticates the request, whether it is allowed or not and sends it to next accordingly.

const auth = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
  
      let decodedData;
  
      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }    
      next();
    } catch (error) {
      console.log(error);
    }
};

export default auth;