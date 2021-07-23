import jwt, { decode } from 'jsonwebtoken';

//user wants to like a post
//click the like button => auth middleware (NEXT) => like controller...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;  //if token length is greater than 500 then it is google auth

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // sub is an id to differentiate every single google user id
            
        }

        next();

    } catch (error) {
        console.log(error);
    }
};

export default auth;
