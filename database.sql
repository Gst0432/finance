-- Création de la base de données
CREATE DATABASE IF NOT EXISTS g_finance;
USE g_finance;

-- Table des utilisateurs
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expiry_date DATETIME,
    auto_renew BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME
);

-- Table des informations d'entreprise des utilisateurs
CREATE TABLE company_info (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    company_name VARCHAR(100),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des produits
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    seller_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    purchase_price DECIMAL(15, 2) NOT NULL,
    selling_price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des services
CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY,
    seller_id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2) NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des transactions
CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('premium', 'sale') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    buyer_name VARCHAR(100),
    buyer_email VARCHAR(100),
    buyer_phone VARCHAR(20),
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'completed',
    item_id VARCHAR(36),
    seller_id VARCHAR(36),
    buyer_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des objectifs de vente
CREATE TABLE sales_goals (
    id VARCHAR(36) PRIMARY KEY,
    seller_id VARCHAR(36) NOT NULL,
    target DECIMAL(15, 2) NOT NULL,
    current DECIMAL(15, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type ENUM('monthly', 'yearly') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des dépenses
CREATE TABLE expenses (
    id VARCHAR(36) PRIMARY KEY,
    seller_id VARCHAR(36) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des ventes d'abonnements
CREATE TABLE subscription_sales (
    id VARCHAR(36) PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP NOT NULL,
    status ENUM('active', 'expired') DEFAULT 'active',
    seller_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des tableaux de produits numériques
CREATE TABLE digital_product_tables (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    seller_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des produits numériques
CREATE TABLE digital_products (
    id VARCHAR(36) PRIMARY KEY,
    table_id VARCHAR(36) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    link TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES digital_product_tables(id) ON DELETE CASCADE
);

-- Table des revenus publicitaires
CREATE TABLE ad_revenue (
    id VARCHAR(36) PRIMARY KEY,
    date DATE NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    impressions INT NOT NULL,
    clicks INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des notifications
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des sessions
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des logs d'audit
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    action VARCHAR(50) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Index pour optimiser les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_seller ON transactions(seller_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_seller ON expenses(seller_id);
CREATE INDEX idx_subscription_sales_status ON subscription_sales(status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);

-- Vues pour les rapports courants
CREATE VIEW monthly_sales_summary AS
SELECT 
    seller_id,
    DATE_FORMAT(date, '%Y-%m') as month,
    COUNT(*) as total_transactions,
    SUM(amount) as total_amount
FROM transactions
GROUP BY seller_id, DATE_FORMAT(date, '%Y-%m');

CREATE VIEW active_subscriptions AS
SELECT 
    seller_id,
    COUNT(*) as total_subscriptions,
    SUM(amount) as total_revenue
FROM subscription_sales
WHERE status = 'active'
GROUP BY seller_id;

-- Procédure stockée pour le nettoyage automatique
DELIMITER //
CREATE PROCEDURE cleanup_old_data()
BEGIN
    -- Supprimer les anciennes sessions expirées
    DELETE FROM sessions WHERE expires_at < NOW();
    
    -- Marquer les abonnements expirés
    UPDATE subscription_sales 
    SET status = 'expired' 
    WHERE expiry_date < NOW() AND status = 'active';
    
    -- Archiver les vieux logs d'audit (plus de 6 mois)
    DELETE FROM audit_logs 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
END //
DELIMITER ;

-- Événement pour exécuter le nettoyage automatique
CREATE EVENT cleanup_event
ON SCHEDULE EVERY 1 DAY
DO CALL cleanup_old_data();

-- Trigger pour l'audit des modifications utilisateur
DELIMITER //
CREATE TRIGGER user_audit_trigger
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, action, details)
    VALUES (
        NEW.id,
        'USER_UPDATED',
        CONCAT(
            'Changes: ',
            IF(NEW.name != OLD.name, CONCAT('name: ', OLD.name, ' -> ', NEW.name, '; '), ''),
            IF(NEW.email != OLD.email, CONCAT('email: ', OLD.email, ' -> ', NEW.email, '; '), ''),
            IF(NEW.is_premium != OLD.is_premium, CONCAT('premium status: ', OLD.is_premium, ' -> ', NEW.is_premium, '; '), '')
        )
    );
END //
DELIMITER ;

-- Insertion de l'utilisateur admin par défaut
INSERT INTO users (id, name, email, password_hash, role, is_premium, is_active)
VALUES (
    UUID(),
    'Administrateur',
    '227makemoney@gmail.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2NMj7CvGei', -- 'admin123' hashé
    'admin',
    TRUE,
    TRUE
);