import mysql from 'mysql2/promise';

async function initializeDatabase() {
  try {
    // First create a connection without database selection
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'debasis_75863'
    });

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS temple_donations');
    await connection.query('USE temple_donations');

    // Create the donations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        merchant_transaction_id VARCHAR(100) UNIQUE NOT NULL,
        getepay_transaction_id VARCHAR(100),
        amount DECIMAL(10,2) NOT NULL,
        donor_name VARCHAR(255) NOT NULL,
        donor_email VARCHAR(255) NOT NULL,
        donor_phone VARCHAR(20) NOT NULL,
        donor_address TEXT,
        purpose VARCHAR(100),
        message TEXT,
        payment_status VARCHAR(20) DEFAULT 'PENDING',
        payment_mode VARCHAR(50),
        transaction_date DATETIME,
        response_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_merchant_txn (merchant_transaction_id),
        INDEX idx_getepay_txn (getepay_transaction_id),
        INDEX idx_status (payment_status)
      );
    `);

    // Create the payment_logs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payment_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        donation_id BIGINT,
        log_type VARCHAR(50),
        status VARCHAR(50),
        message TEXT,
        raw_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
      );
    `);

    console.log('Database initialization completed successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

initializeDatabase();
