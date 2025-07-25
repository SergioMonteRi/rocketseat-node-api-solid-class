# App

GymPass style app.


## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histótico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas até 10km;
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;



## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer dois check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia; 
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só poder validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;



## RNFs (Requisitos não-funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [X] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

# Setup

```sh
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```