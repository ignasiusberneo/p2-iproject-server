## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /dramas`
- `GET /dramas:dramaId`

Routes below need authentication:

- `GET /dramas/wishlist/`
- `POST /dramas/watchlist/:dramaId`
- `POST /dramas/:dramaId`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "username": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}

OR
{
  "message": "Email already exists"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password must be 8-20 characters"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /dramas

Description:

- Fetch all dramas from database

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "imageUrl": "string",
    "CategoryId": "integer"
  },
  ...,
]
```

&nbsp;

## 4. GET /dramas/:dramaId

Description:

- Get Drama based on given ID

Request:

- headers:

- params:

```json
{
  "dramaId": "integer"
}
```

_Response (200 - OK)_

````json
```json

  {
    "id": "integer",
    "title": "string",
    "imageUrl": "string",
    "CategoryId": "integer"
  },
````

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
