import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers['authorization']?.split(' ')[1];

   if (!token) return res.status(401).json({ success: false, msg: "Access denied" });

   try {
      const validToken = verify(token, process.env.JWT_SECRET!);

      if (validToken) return next();

   } catch (err: any) {
      return res.status(401).json({ success: false, msg: "Access denied", error: err.message });
   }
};
