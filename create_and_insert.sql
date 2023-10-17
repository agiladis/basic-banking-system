CREATE TABLE IF NOT EXISTS customers
(
    id SERIAL PRIMARY KEY,
    identity_card INTEGER NOT NULL,
    name VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts
(
    id             SERIAL PRIMARY KEY,
    account_number BIGINT       NOT NULL,
    username       VARCHAR(30)  NOT NULL,
    password       VARCHAR(100) NOT NULL,
    balance        INTEGER   DEFAULT NULL,
    isActive       BOOLEAN   DEFAULT true,
    created_at     TIMESTAMP DEFAULT NOW(),
    customer_id    SERIAL,
    CONSTRAINT fk_customer_id
    FOREIGN KEY (customer_id)
    REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS transactions
(
    id                       SERIAL PRIMARY KEY,
    transaction_number       INTEGER NOT NULL,
    recipient_account_number BIGINT  NOT NULL,
    amount                   INTEGER NOT NULL,
    status                   BOOLEAN NOT NULL,
    created_at               TIMESTAMP DEFAULT NOW(),
    account_id               SERIAL,
    CONSTRAINT fk_account_id
    FOREIGN KEY (account_id)
    REFERENCES accounts(id)
);

INSERT INTO customers (id_card, name, address) VALUES (123190111, 'Ridwan Kuko', 'Jl. satu');
INSERT INTO customers (id_card, name, address) VALUES (123190112, 'Nathan Simochuaks', 'Jl. dua');
INSERT INTO customers (id_card, name, address) VALUES (123190113, 'Ropi Meropi', 'Jl. tiga');
INSERT INTO customers (id_card, name, address) VALUES (123190114, 'Andre Tauaja', 'Jl. empat');
INSERT INTO customers (id_card, name, address) VALUES (123190115, 'Simon Sirene', 'Jl. lima');
INSERT INTO customers (id_card, name, address) VALUES (123190116, 'Dihapus', 'Jl. hapus');

SELECT * FROM customers;

INSERT INTO accounts (account_number, username, balance, password, customer_id) VALUES (321321111, 'ridwan', 10000, 'ridwan', 1);
INSERT INTO accounts (account_number, username, balance, password, customer_id) VALUES (321321112, 'nathan', 10000, 'nathan', 2);
INSERT INTO accounts (account_number, username, balance, password, customer_id) VALUES (321321113, 'ropi', 10000, 'ropi', 3);
INSERT INTO accounts (account_number, username, balance, password, customer_id) VALUES (321321114, 'andre', 10000, 'andre', 4);
INSERT INTO accounts (account_number, username, balance, password, customer_id) VALUES (321321115, 'simon', 10000, 'simon', 5);

SELECT * FROM accounts;

INSERT INTO transactions (transaction_number, recipient_account_number, amount, status, account_id)  VALUES (111, 321321112, 100, true, 1);
INSERT INTO transactions (transaction_number, recipient_account_number, amount, status, account_id)  VALUES (112, 321321113, 100, true, 2);
INSERT INTO transactions (transaction_number, recipient_account_number, amount, status, account_id)  VALUES (113, 321321114, 100, true, 3);
INSERT INTO transactions (transaction_number, recipient_account_number, amount, status, account_id)  VALUES (114, 321321115, 100, true, 4);
INSERT INTO transactions (transaction_number, recipient_account_number, amount, status, account_id)  VALUES (114, 321321111, 100, true, 5);

SELECT * FROM transactions;

UPDATE customers SET name = 'Ridwan Kukow' WHERE id = 1;

SELECT * FROM customers;

DELETE FROM customers WHERE id = 6;

-- Select join table
SELECT a.name, b.account_number, b.balance, c.transaction_number, c.recipient_account_number, c.amount FROM customers a LEFT JOIN accounts b ON a.id = b.customer_id LEFT JOIN transactions c ON b.id = c.account_id;

