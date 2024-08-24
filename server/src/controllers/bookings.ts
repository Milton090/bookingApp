import { connectDB } from '../config/db';
import { Request, Response } from 'express';
import { BookingI } from '../interfaces/booking.interface';
import sql from 'mssql';



const getAll = async (req: Request, res: Response) => {
   try {

      const pool = await connectDB();

      const result = await pool!.request().query('SELECT b.id, b.dateBooking, c.id as customerId, c.name, c.lastName, s.id as serviceId, s.name as serviceName FROM hotel.dbo.bookings as b INNER JOIN hotel.dbo.customers as c ON b.customerId = c.id INNER JOIN hotel.dbo.services as s ON b.serviceId = s.id');

      res.status(200).json({ success: true, msg: "Bookings retrieved successfully", data: result.recordset });

   } catch (err: any) {
      console.error('Error registering user:', err);
      res.status(500).json({ success: false, msg: "Failed to r", error: err.message });
   }
};


const create = async (req: Request, res: Response) => {
   const { customerId, serviceId, dateBooking }: BookingI = req.body;
   if (!customerId || !serviceId || !dateBooking) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      await pool!.request()
         .input('customerId', sql.Int, customerId)
         .input('serviceId', sql.Int, serviceId)
         .input('dateBooking', sql.DateTime, dateBooking)
         .query(`
                INSERT INTO hotel.dbo.bookings (customerId, serviceId, dateBooking)
                VALUES (@customerId, @serviceId, @dateBooking);
            `);

      res.status(201).json({ success: true, msg: "Reservacion creada exitosamente" });

   } catch (err: any) {
      console.error('Error creating service:', err);
      res.status(500).json({ success: false, msg: "Failed to create booking", error: err.message });
   }
}


const update = async (req: Request, res: Response) => {
   const { id } = req.params;
   const { customerId, serviceId, dateBooking }: BookingI = req.body;
   if (!customerId || !serviceId || !dateBooking) return res.status(400).json({ success: false, msg: "Bad request" });

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('id', sql.Int, id)
         .input('customerId', sql.Int, customerId)
         .input('serviceId', sql.Int, serviceId)
         .input('dateBooking', sql.DateTime, dateBooking)
         .query(`
                UPDATE hotel.dbo.bookings
                SET customerId = @customerId, serviceId = @serviceId, dateBooking = @dateBooking
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Booking not found" });
      }

      res.status(200).json({ success: true, msg: "Reservacion actualizada exitosamente" });

   } catch (err: any) {
      console.error('Error updating service:', err);
      res.status(500).json({ success: false, msg: "Failed to update booking", error: err.message });
   }
};


const remove = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const pool = await connectDB();
      const result = await pool!.request()
         .input('id', sql.Int, id)
         .query(`
                DELETE FROM hotel.dbo.bookings
                WHERE id = @id;
            `);

      if (result.rowsAffected[0] === 0) {
         return res.status(404).json({ success: false, msg: "Booking not found" });
      }

      res.status(200).json({ success: true, msg: "Reservacion eliminada exitosamente" });

   } catch (err: any) {
      console.error('Error deleting service:', err);
      res.status(500).json({ success: false, msg: "Failed to delete booking", error: err.message });
   }
};



export { getAll, create, update, remove };