create database db_dados_clientes;

use db_dados_clientes;

create table clientes(
    id int not null auto_increment,
    nome varchar(45) not null,
    tel_cel varchar(20) not null,
    tel_fixo varchar(15) not null,
    email varchar(45) not null,
    primary key (id)
);

INSERT INTO
    db_dados_clientes.clientes (nome, tel_cel, tel_fixo, email)
VALUES
    (
        'João',
        "19 99350-8280",
        "3828-8483",
        "joao@gmail.com"
    );

INSERT INTO
    db_dados_clientes.clientes (nome, tel_cel, tel_fixo, email)
VALUES
    (
        'Lucas',
        "19 98332-3024",
        "3828-7928",
        "lucas@gmail.com"
    );

INSERT INTO
    db_dados_clientes.clientes (nome, tel_cel, tel_fixo, email)
VALUES
    (
        'Maria',
        "19 99270-7983",
        "3828-8463",
        "maria@gmail.com"
    );

INSERT INTO
    db_dados_clientes.clientes (nome, tel_cel, tel_fixo, email)
VALUES
    (
        'Joaquim',
        "19 99453-7270",
        "3828-8483",
        "joaquim@gmail.com"
    );

SELECT
    *
FROM
    db_dados_clientes.clientes;