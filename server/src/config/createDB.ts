export const createDatabase = `
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'hotel') 
BEGIN 
    CREATE DATABASE hotel; 
END
`;

export const createTables = `
USE hotel; 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U')) 
BEGIN 
    CREATE TABLE users ( 
        id INT IDENTITY(1, 1) PRIMARY KEY, 
        username VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL 
    ); 
END 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[customers]') AND type in (N'U')) 
BEGIN 
    CREATE TABLE customers ( 
        id INT IDENTITY(1, 1) PRIMARY KEY, 
        name VARCHAR(100) NOT NULL, 
        lastName VARCHAR(200) NOT NULL, 
        email VARCHAR(200) NOT NULL, 
        phone VARCHAR(200) NOT NULL 
    ); 
END 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[services]') AND type in (N'U')) 
BEGIN 
    CREATE TABLE services ( 
        id INT IDENTITY(1, 1) PRIMARY KEY, 
        name VARCHAR(100) NOT NULL, 
        description VARCHAR(200) NOT NULL 
    ); 
END 
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[bookings]') AND type in (N'U')) 
BEGIN 
    CREATE TABLE bookings ( 
        id INT IDENTITY(1, 1) PRIMARY KEY, 
        dateBooking DATETIME NOT NULL, 
        customerId INT NOT NULL, 
        serviceId INT NOT NULL, 
        FOREIGN KEY(customerId) REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE, 
        FOREIGN KEY(serviceId) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE 
    ); 
END
`;
