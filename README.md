# REST-API-ELEKTRO | TT-Dev-25.1

**Status do Projeto** :  Entregue no dia 06/02/2024. No entanto, alterações feitas somente para título de exercício das habilidades fullstack desenvolvidas durante o TT-Dev.1.

![Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Badge](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Tabela de Conteúdo


 1. [Tecnologias utilizadas](#tecnologias-utilizadas)
 2. [Instalação](#instalação)
 3. [Configuração](#configuração)
 4. [Uso](#uso)
 6. [Arquitetura](#arquitetura)
 7. [Autor](#autor)
 
## Tecnologias utilizadas

Essas são as frameworks e ferramentas que você precisará instalar para desenvolver esse projeto:

 - Express, versão 4.21.2
 - React Native, versão 0.76.7
 - Prisma, versão 6.3.1
 - Postgres

## Instalação 

1. No terminal, clone o projeto com o comando:

``` bash
$ git clone https://github.com/ccdsilva/REST-API-ELEKTRO.git
```
2. Para instalar as dependências de frontend, abra a pasta front do projeto e abra o terminal, então digite o comando:

``` bash
$ yarn install
```
3. Para instalar as dependências de backend, abra a pasta front do projeto e abra o terminal, então digite o comando:

``` bash
$ npm install
```

## Configuração


1. O projeto frontend deve funcionar sem problemas, mas o projeto backend ainda precisa do prisma configurado. Abra o terminal na pasta back e rode o comando:

``` bash
$ npx prisma migrate dev --name init
```
2. Também é necessário gerar as chaves de criptografia. Rode o comando no terminal:
   
``` bash
$ npx ts-node src/config/generateRSAKeyPair.ts
```
 
## Uso

### Frontend

Abra a pasta do frontend no terminal, e rode o comando:

``` bash
$ yarn start
```
### Backend

Abra a pasta do backend no terminal, e rode o comando:

``` bash
$ npm start
```

## Arquitetura

- [Modelagem ER do Banco de Dados](https://github.com/ccdsilva/REST-API-ELEKTRO/blob/master/backend/elektroapi_ModeloER.png)

## Autor

* Dev Back-end - Cleiton Silva

  

## Última atualização: 23/02/2025



