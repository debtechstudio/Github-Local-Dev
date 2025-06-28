-- Create database
CREATE DATABASE IF NOT EXISTS templedb;
USE templedb;

-- Create donations table
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

-- Create payment_logs table
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
