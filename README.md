# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
    - [Instalando Dependências](#21-instalando-dependências)
    - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
    - [Migrations](#23-migrations)
- [Autenticação](#3-autenticação)
- [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/pt-BR/)

A URL base da aplicação:
https://new-books-api.onrender.com/

---

## 2. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
npm run typeorm migration:run -- -d ./src/data-source.ts
```

---
## 3. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuários)
	- [GET - /users/:id](#13-listar-usuário-por-id)
 - [PATCH - /users/:id](#14-atualizando-usuário)
 - [DELETE - /users/:id](#15-apagando-usuário)
- [Books](#2-books)
- [Comments](#3-comment)
- [Assessments](#4-assessment)

---

## 1. **Users**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | string  | Identificador único do usuário                  |
| name         | string  | O nome do usuário.                              |
| email        | string  | O e-mail do usuário.                            |
| password     | string  | A senha de acesso do usuário                    |
| birthday     | string  | Data de aniversário do usuário.                 |
| resetCode    | string  | Código de reset da senha.                       |
| admin        | boolean | Booleano se o usuário é um administrador.       |
| createdAt    | date    | Data de criação da conta.                       |
| updatedAt    | date    | Data de atualização da conta.                   |
| deletedAt    | date    | Data de remoção da conta.                       |


### Endpoints

| Método   | Rota       | Descrição                                           |
|----------|------------|-----------------------------------------------------|
| POST     | /users     | Criação de um usuário.                              |
| GET      | /users     | Lista todos os usuários                             |
| GET      | /users/:id | Lista um usuário usando seu ID como parâmetro       |
| PATCH    | /users/:id | Atualizando um usuário usando seu ID como parâmetro.|
| DELETE   | /users/:id | Deletando um usuário usando seu ID como parâmetro.  |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://new-books-api.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
 {
	"name": "João Paulo",
  "email": "joaopaulo@mail.com",
  "birthday": "19/06/2002",
  "password": "password123",
  "admin": false 
    }
```

### Schema de Validação com Zod:
```javascript
const userSchema = z.object({
  id: z.string(),
  name: z.string().max(150),
  email: z.string().max(150).email(),
  birthday: z.string(),
  password: z.string().max(150),
  resetCode: z.string().max(8).nullable(),
  admin: z.boolean().default(false),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  resetCode: true,
});
```
OBS.: Chaves não presentes no schema/no userSchema.omit serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
	"name": "João Paulo",
	"email": "joaopaulo@mail.com",
	"birthday": "19/06/2002",
	"admin": false,
	"createdAt": "2024-03-08",
	"updatedAt": "2024-03-08",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: https://new-books-api.onrender.com
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
	"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
	"name": "João Paulo",
	"email": "joaopaulo@mail.com",
	"birthday": "19/06/2002",
	"admin": false,
	"createdAt": "2024-03-08",
	"updatedAt": "2024-03-08",
	"deletedAt": null
}
]
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/8f965cf7-b4bc-4cfe-ac39-a3d970a36601
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
	{
	"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
	"name": "João Paulo",
	"email": "joaopaulo@mail.com",
	"birthday": "19/06/2002",
	"admin": false,
	"createdAt": "2024-03-08",
	"updatedAt": "2024-03-08",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---

### 1.4. **Atualizar Usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
PATCH /users/8f965cf7-b4bc-4cfe-ac39-a3d970a36601
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"name": "John"
}

```

### Exemplo de Response:
```
200 OK
```
```json
	{
	"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
	"name": "John",
	"email": "joaopaulo@mail.com",
	"birthday": "19/06/2002",
	"admin": false,
	"createdAt": "2024-03-08",
	"updatedAt": "2024-03-08",
	"deletedAt": null
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---

### 1.5. **Deletar Usuário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/users/:id`

### Exemplo de Request:
```
PATCH /users/8f965cf7-b4bc-4cfe-ac39-a3d970a36601
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found  | User not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |


---


## 2. **Books**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Books é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | string  | Identificador único do livro.                   |
| title        | string  | O título do livro.                              |
| author       | string  | O autor do livro.                               |
| description  | string  | Descrição do livro.                             |
| genres       | sting[] | Lista de gêneros do livro.                      |
| type         | string  | O tipo de livro.                                |
| cover        | string  | URL da imagem de capa do livro.                 |
| views        | number  | Número de visualizações do livro.               |
| launched_in  | string  | Data de lançamento do livro.                    |
| status       | string  | Status atual do livro.                          |
| isActive     | boolean | Se o Livro foi desativado.                      |
| user         | user    | usuário que adicionou o livro.                  |
| comments     | comment | Comentarios do livro.                           |
| assessments  | assessment | Avaliações do livro.                         |



### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /books             | Criação de um livro.                              |
| GET      | /books     | Lista todos os livros.                            |
| GET      | /books/:id | Lista um livro usando seu ID como parâmetro       |
| PATCH    | /books/:id | Atualizando um livro usando seu ID como parâmetro.|
| DELETE   | /books/:id | Deletando um livro usando seu ID como parâmetro.  |

---

### 1.1. **Criação de Livro**

[ Voltar para os Endpoints ](#4-endpoints)

### `/books`

### Exemplo de Request:
```
POST /books
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"title": "I’m Not That Kind of Talent",
  "author": "Denphy",
  "description": "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
  "type": "Manhwa",
  "cover": "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
  "launched_in": "2022",
  "status": "Em lançamento",
  "genres": ["Ação", "Aventura", "Drama", "Fantasia", "Shounen"]
}
```

### Schema de Validação com Zod:
```javascript
const bookSchema = z.object({
  id: z.string(),
  title: z.string().max(125),
  author: z.string().max(125),
  description: z.string(),
  type: z.string().max(125),
  views: z.number().default(0),
  cover: z.string(),
  launched_in: z.string().max(4),
  isActive: z.boolean().default(true),
  status: z.string().max(60),
  genres: z.string().array(),
  user: userReturnSchema,
  comments: commentSchema.array(),
  assessments: assessmentSchema.array(),
});

const bookCreateSchema = bookSchema.omit({
  id: true,
  isActive: true,
  comments: true,
  assessments: true,
  user: true,
  views: true,
});
```
OBS.: Chaves não presentes no schema/presentes no bookSchema.omit serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "5263f187-ce6a-4b24-b5d0-aba7f7480690",
	"title": "I’m Not That Kind of Talent",
	"author": "Denphy",
	"description": "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
	"type": "Manhwa",
	"views": 0,
	"cover": "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
	"launched_in": "2022",
	"isActive": true,
	"status": "Em lançamento",
	"genres": [
		"Ação",
		"Aventura",
		"Drama",
		"Fantasia",
		"Shounen"
	],
	"comments": [],
	"assessments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found  | Invalid token. |

---

### 1.2. **Listando Livros**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books`

### Exemplo de Request:
```
GET /books
Host: https://new-books-api.onrender.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
	"id": "5263f187-ce6a-4b24-b5d0-aba7f7480690",
	"title": "I’m Not That Kind of Talent",
	"author": "Denphy",
	"description": "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
	"type": "Manhwa",
	"views": 0,
	"cover": "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
	"launched_in": "2022",
	"isActive": true,
	"status": "Em lançamento",
	"genres": [
		"Ação",
		"Aventura",
		"Drama",
		"Fantasia",
		"Shounen"
	],
	"comments": [],
	"assessments": []
},
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Livro por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books/:id`

### Exemplo de Request:
```
GET /books/5263f187-ce6a-4b24-b5d0-aba7f7480690
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | string      | Identificador único do livro (Book)   |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "5263f187-ce6a-4b24-b5d0-aba7f7480690",
	"title": "I’m Not That Kind of Talent",
	"author": "Denphy",
	"description": "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
	"type": "Manhwa",
	"views": 0,
	"cover": "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
	"launched_in": "2022",
	"isActive": true,
	"status": "Em lançamento",
	"genres": [
		"Ação",
		"Aventura",
		"Drama",
		"Fantasia",
		"Shounen"
	],
	"comments": [],
	"assessments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Book not found. |
| 404 Not Found  | Invalid token. |

---

### 1.4. **Atualizar Livro**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books/:id`

### Exemplo de Request:
```
PATCH /books/5263f187-ce6a-4b24-b5d0-aba7f7480690
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | string      | Identificador único do livro (Books) |

### Corpo da Requisição:
```json
{
	"status": "Finalizado"
}

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "5263f187-ce6a-4b24-b5d0-aba7f7480690",
	"title": "I’m Not That Kind of Talent",
	"author": "Denphy",
	"description": "Eu não sou esse tipo de pessoa.Eu, Deon Hart, sou um enfermo que vomita sangue sempre que estou estressado.No entanto, ao mesmo tempo, sou o Conde Hart, que de alguma forma foi incompreendido e considerado uma pessoa forte e, portanto, temido por todos.",
	"type": "Manhwa",
	"views": 0,
	"cover": "https://cdn.anime-planet.com/manga/primary/im-not-that-kind-of-talent-1.webp?t=1681353982",
	"launched_in": "2022",
	"isActive": true,
	"status": "Finalizado",
	"genres": [
		"Ação",
		"Aventura",
		"Drama",
		"Fantasia",
		"Shounen"
	],
	"comments": [],
	"assessments": []
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Book not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |


---

### 1.5. **Deletar Livro**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books/:id`

### Exemplo de Request:
```
PATCH /books/5263f187-ce6a-4b24-b5d0-aba7f7480690
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | string      | Identificador único do livro (books) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Book not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---

## 2. **Comments**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Comments é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | number  | Identificador único do comentário.              |
| text         | string  | Comentário.                                     |
| created_at   | date    | Data de criação.                                |
| user         | user    | Usuário do comentario.                          |
| book         | book    | Livro do comentario.                            |



### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /books/:id_book/comments   | Criação de um comentário.                              |
| PATCH    | /books/comments/:id_comments | Atualizando um comentário usando seu ID como parâmetro.|
| DELETE   | /books/comments/:id_comments | Deletando um comentário usando seu ID como parâmetro.  |

---

### 2.1. **Criação de Comentário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/books/:id_book/comments`

### Exemplo de Request:
```
POST /books/5263f187-ce6a-4b24-b5d0-aba7f7480690/comments
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"text": "Muito bom!"
}
```

### Schema de Validação com Zod:
```javascript
const commentSchema = z.object({
  id: z.number().positive(),
  text: z.string().max(240),
  user: userReturnSchema,
});

const commentReadSchema = commentSchema.array();
const commentCreateSchema = z.object({
  text: z.string().max(200),
});
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 1,
	"text": "Muito bom",
	"user": {
		"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
		"name": "John",
		"email": "joaopaulo@mail.com",
		"birthday": "2002-06-19",
		"admin": false,
		"createdAt": "2024-03-06",
		"updatedAt": "2024-03-06",
		"deletedAt": null
	}
}
```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found  | Book not found. |
| 404 Not Found  | Invalid token. |

---
### 2.2. **Atualizar Comentário**

[ Voltar aos Endpoints ](#4-endpoints)

### `books/comments/:id`

### Exemplo de Request:
```
PATCH /books/comments/1
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do comentário (comments) |

### Corpo da Requisição:
```json
{
	"text": "Acabou :("
}

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 1,
	"text": "Acabou :(",
	"user": {
		"id": "8f965cf7-b4bc-4cfe-ac39-a3d970a36601",
		"name": "John",
		"email": "joaopaulo@mail.com",
		"birthday": "2002-06-19",
		"admin": false,
		"createdAt": "2024-03-06",
		"updatedAt": "2024-03-06",
		"deletedAt": null
	}
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Comment not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |


---

### 2.3. **Deletar Comentário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books/comments/:id`

### Exemplo de Request:
```
PATCH /books/comments/1
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do comentário (comments) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Comment not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---

## 3. **Assessments**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto Assessments é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | number  | Identificador único da avaliação.               |
| rating       | number  | Avaliação.                                     |
| created_at   | date    | Data de criação.                                |
| user         | user    | Usuário da avaliação.                          |
| book         | book    | Livro da avaliação.                            |



### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /books/:id_book/assessments   | Criação de uma avaliação.                              |
| PATCH    | /books/assessments/:id_assessments | Atualizando uma avaliação usando seu ID como parâmetro.|
| DELETE   | /books/assessments/:id_assessments | Deletando uma avaliação usando seu ID como parâmetro.  |

---

### 2.1. **Criação de Avaliação**

[ Voltar para os Endpoints ](#4-endpoints)

### `/books/:id_book/assessments`

### Exemplo de Request:
```
POST /books/5263f187-ce6a-4b24-b5d0-aba7f7480690/assessments
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"rating": 5
}
```

### Schema de Validação com Zod:
```javascript
const assessmentSchema = z.object({
  id: z.number().positive(),
  rating: z.number().positive(),
});

const assessmentReadSchema = assessmentSchema.array();
const assessmentCreateSchema = z.object({
  rating: z.number().positive(),
});
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 1,
	"rating": 5
}

```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found  | Book not found. |
| 404 Not Found  | Invalid token. |

---
### 2.2. **Atualizar Avaliação**

[ Voltar aos Endpoints ](#4-endpoints)

### `books/assessments/:id`

### Exemplo de Request:
```
PATCH /books/assessments/1
Host: https://new-books-api.onrender.com/
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do avaliação (assessments) |

### Corpo da Requisição:
```json
{
	"rating": 3
}

```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": 1,
	"rating": 3
}
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Comment not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |


---

### 2.3. **Deletar Comentário**

[ Voltar aos Endpoints ](#4-endpoints)

### `/books/assessments/:id`

### Exemplo de Request:
```
PATCH /books/assessments/1
Host: https://new-books-api.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                                      |
|-------------|-------------|------------------------------------------------|
| id          | number      | Identificador único do avaliação (assessments) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro  | Descrição               |
|-----------------|-------------------------|
| 404 Not Found  | Comment not found. |
| 404 Not Found  | Invalid token. |
| 403 Forbidden  | Insufficient permissions. |

---


## 4. **Login**
[ Voltar para os Endpoints ](#4-endpoints)

### Endpoints

| Método   | Rota               | Descrição                                           |
|----------|--------------------|-----------------------------------------------------|
| POST     | /login             | Faz o login do usuário.                             |

---

### 4.1. **Login do Usuário**

[ Voltar para os Endpoints ](#4-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: https://new-books-api.onrender.com
Authorization: 
Content-type: application/json
```

### Corpo da Requisição:
```json
{
 "email": "joaopaulo@mail.com",
 "password": "password123"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4ODY1NjIzMCwiZXhwIjoxNjg4NzQyNjMwLCJzdWIiOiIxIn0.n3ro-2srzeDCsIs0VBZYRoCpmkHUJuuzvFv9T0pHgYs"
}
```

### Possíveis Erros:
| Código do Erro  | Descrição            |
|-----------------|----------------------|
| 404 Not Found   | User not found.      |

---


