CREATE DATABASE banner_app;
USE banner_app;

CREATE TABLE banner(
    id INT PRIMARY KEY AUTO_INCREMENT,
    banner_desc VARCHAR(255) NOT NULL, 
    banner_timer integer DEFAULT 10 NOT NULL,
    banner_link VARCHAR(255) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE -- New column for visibility check
);

INSERT INTO banner(banner_desc, banner_timer, banner_link) VALUES ('This is my resume', 15, 'https://tonybhaskar.github.io/Resume/');