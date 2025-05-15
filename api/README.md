# Projeto Dictonary English

## LINK
https://back-free-dictonary-production.up.railway.app
https://github.com/prasiso/back-free-dictonary

## Descrição
O objetivo do projeto é um dicionário de palavras em inglês

# Iniciando o Projeto

- Deve se rodar somente postagre-sql que encontra no docker compose
- Caso seja a primeira vez rodando rode um _npx prisma db push_ e após rode _npx prisma db seed_
- Rode o script do **npm run start:init** e após rode o **npm run start:dev**

## Raciocínio Lógico

### Dia 1

- Feito um docker com imagem de postgres e build do app
- Modular o Banco
- Adicionado Swagger com estrutura do crud que deve ser usado no projeto

### Dia 2

- Feito os end points de auth, user e entries
- Terminado a documentação

## Estrutura

### CRUD

- Criar dentro da pasta modules o nome do crud, com a estrutura do health adicionando a camada service
- Dentro da pasta decorator defina os decorator a ser usada como skipAuth
- Configure o swagger a melhor maneira descrita

#### CAMADAS

##### ROUTER

- Primeira camda a ser chamada onde definimos os decorator, rotas e DTO

##### CONTROLLER

- Após o router deve ser chamada a camada de controller onde deve ter as chamadas de excções

##### SERVICE

- Após o controller temos a camada de service onde deve conter regra de negocios e mudanças

##### REPOSITORY

- Após o service temos a camada de repository onde deve conter a chamadas no banco como CREATE, READ, UPDATE e DELETE

### Swagger

- Dentro da pasta swagger de cada end point deve se colocar para o que serve api e response dele
- Deve se colocar o decorator response global contendo os erros 401 e 500, junto com a resposta de cada end point pode ter

>  This is a challenge by [Coodesh](https://coodesh.com/)