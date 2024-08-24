import jwt from 'jsonwebtoken';


export const generateJwt = (uid: string, username: string): string => {

   return jwt.sign({ uid, username }, 'secretKey', {
      expiresIn: '1h'
   });
}