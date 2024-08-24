import { connectDB } from '../config/db';
import { Request, Response } from 'express';
import { ServiceI } from '../interfaces/service.interface';
import sql from 'mssql';



const getAll = async (req: Request, res: Response) => {
   try {

      const pool = await connectDB();

      const result = await pool!.request().query('SELECT * FROM hotel.dbo.services');

      res.status(200).json({ success: true, msg: "Services retrieved successfully", data: result.recordset });

   } catch (err: any) {
      console.error('Error getting services:', err);
      res.status(500).json({ success: false, msg: "Failed to get services", error: err.message });
   }
};


const create = async (req: Request, res: Response) => {
   const { name, description }: ServiceI = req.body;
   if (!name || !description) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      await pool!.request()
         .input('name', sql.VarChar, name)
         .input('description', sql.VarChar, description)
         .query(`
                INSERT INTO hotel.dbo.services (name, description)
                VALUES (@name, @description);
            `);

      res.status(201).json({ success: true, msg: "Servicio creado exitosamente" });

   } catch (err: any) {
      console.error('Error creating service:', err);
      res.status(500).json({ success: false, msg: "Failed to create service", error: err.message });
   }
}



const update = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { name, description }: ServiceI = req.body;
   if (!name || !description) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('name', sql.VarChar, name)
         .input('description', sql.VarChar, description)
         .input('id', sql.Int, id)
         .query(`
                UPDATE hotel.dbo.services
                SET name = @name, description = @description
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Service not found" });
      }

      res.status(200).json({ success: true, msg: "Servicio actualizado exitosamente" });

   } catch (err: any) {
      console.error('Error updating service:', err);
      res.status(500).json({ success: false, msg: "Failed to update service", error: err.message });
   }
};


const remove = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('id', sql.Int, id)
         .query(`
                DELETE FROM hotel.dbo.services
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Service not found" });
      }

      res.status(200).json({ success: true, msg: "Servicio eliminado exitosamente" });

   } catch (err: any) {
      console.error('Error deleting service:', err);
      res.status(500).json({ success: false, msg: "Failed to delete service", error: err.message });
   }
};



export { getAll, create, update, remove };