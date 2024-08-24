import { connectDB } from '../config/db';
import { Request, Response } from 'express';
import { CustomerI } from '../interfaces/customer.interface';
import sql from 'mssql';



const getAll = async (req: Request, res: Response) => {
   try {

      const pool = await connectDB();

      const result = await pool!.request().query('SELECT * FROM hotel.dbo.customers');

      res.status(200).json({ success: true, msg: "Customers retrieved successfully", data: result.recordset });

   } catch (err: any) {
      console.error('Error getting customers:', err);
      res.status(500).json({ success: false, msg: "Failed to get customers", error: err.message });
   }
};


const create = async (req: Request, res: Response) => {
   const { name, lastName, email, phone }: CustomerI = req.body;
   if (!name || !lastName || !email || !phone) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      await pool!.request()
         .input('name', sql.VarChar, name)
         .input('lastName', sql.VarChar, lastName)
         .input('email', sql.VarChar, email)
         .input('phone', sql.VarChar, phone)
         .query(`
                INSERT INTO hotel.dbo.customers (name, lastName, email, phone)
                VALUES (@name, @lastName, @email, @phone);
            `);

      res.status(201).json({ success: true, msg: "Cliente creado exitosamente" });

   } catch (err: any) {
      console.error('Error creating customer:', err);
      res.status(500).json({ success: false, msg: "Failed to create customer", error: err.message });
   }
}



const update = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { name, lastName, email, phone }: CustomerI = req.body;
   if (!name || !lastName || !email || !phone) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('name', sql.VarChar, name)
         .input('lastName', sql.VarChar, lastName)
         .input('email', sql.VarChar, email)
         .input('phone', sql.VarChar, phone)
         .input('id', sql.Int, id)
         .query(`
                UPDATE hotel.dbo.customers
                SET name = @name, lastName = @lastName, email = @email, phone = @phone
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Customer not found" });
      }

      res.status(200).json({ success: true, msg: "Cliente actualizado exitosamente" });

   } catch (err: any) {
      console.error('Error updating customer:', err);
      res.status(500).json({ success: false, msg: "Failed to update customer", error: err.message });
   }
};


const remove = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('id', sql.Int, id)
         .query(`
                DELETE FROM hotel.dbo.customers
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Customer not found" });
      }

      res.status(200).json({ success: true, msg: "Cliente eliminado exitosamente" });

   } catch (err: any) {
      console.error('Error deleting customer:', err);
      res.status(500).json({ success: false, msg: "Failed to delete customer", error: err.message });
   }
};



export { getAll, create, update, remove };