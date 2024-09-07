import jwt from 'jsonwebtoken';


export const generateJwt = (uid: string, username: string): string => {

   return jwt.sign({ uid, username }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
   });
}