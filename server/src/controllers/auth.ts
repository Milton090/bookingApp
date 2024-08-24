import { connectDB } from '../config/db';
import { generateJwt } from '../helpers/generateJWT';
import { Request, Response } from 'express';
import { UserI } from '../interfaces/user.interface';
import sql from 'mssql';
import bcrypt from 'bcryptjs';


const register = async (req: Request, res: Response) => {
   const { username, password }: UserI = req.body;

   if (!username || !password) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();

      const existingUser = await pool!.request()
         .input('username', sql.VarChar, username)
         .query(`
               SELECT * FROM hotel.dbo.users WHERE username = @username;
           `);

      if (existingUser.recordset[0]) {
         return res.json({ success: false, msg: "El nombre de usuario ya está en uso" });
      }

      const hashedPwd = await bcrypt.hash(password, 10);

      await pool!.request()
         .input('username', sql.VarChar, username)
         .input('password', sql.VarChar, hashedPwd)
         .query(`
               INSERT INTO hotel.dbo.users (username, password)
               VALUES (@username, @password);
           `);

      res.status(201).json({ success: true, msg: "User registered successfully" });

   } catch (err: any) {
      console.error('Error registering user:', err);
      res.status(500).json({ success: false, msg: "Failed to register user", error: err.message });
   }
};

const login = async (req: Request, res: Response) => {
   const { username, password }: UserI = req.body;

   if (!username || !password) {
      return res.status(400).json({ success: false, msg: "Bad request" });
   }

   try {
      const pool = await connectDB();

      const result = await pool!.request()
         .input('username', sql.VarChar, username)
         .query(`
               SELECT * FROM hotel.dbo.users WHERE username = @username;
           `);

      const user = result.recordset[0];

      if (!user) {
         return res.json({ success: false, msg: "Credenciales incorrectas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.json({ success: false, msg: "Credenciales incorrectas" });
      }

      const token = generateJwt(user.id, user.username);

      res.status(200).json({ success: true, msg: "User authenticated", data: token });

   } catch (err: any) {
      console.error('Error logging in:', err);
      res.status(500).json({ success: false, msg: "Server error", error: err.message });
   }
};

export { register, login };
