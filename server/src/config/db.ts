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
	const maxRetries = 100;
	let attempt = 0;
	while (attempt < maxRetries) {
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));
			const pool = await sql.connect(config);
			return pool;
		} catch (err) {
			attempt++;

			if (attempt >= maxRetries) {
				throw new Error('Maximum connection attempts reached. Unable to connect to the database.');
			}
		}
	}

	throw new Error('Unexpected error occurred while trying to connect to the database.');
};
