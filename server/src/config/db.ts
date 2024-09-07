import sql from 'mssql';

const config = {
	user: process.env.DB_USER!,
	password: process.env.SA_PASSWORD!,
	server: process.env.DB_HOST!,
	port: parseInt(process.env.DB_PORT!),
	options: {
		encrypt: true,
		trustServerCertificate: true
	}
};

export const connectDB = async (): Promise<sql.ConnectionPool> => {
	const pool = new sql.ConnectionPool(config);
	await pool.connect();
	return pool;
};
