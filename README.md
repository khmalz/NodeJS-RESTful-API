BELAJAR RESTFUL API Dengan NODE JS

# API Reference

-  User
-  Contact
-  Address

## User API Spec

#### Register User API

```http
POST /api/users
```

Request Body :

```json
{
   "username": "kmlz",
   "password": "rahasia",
   "name": "Khairul Akmal"
}
```

Response Body Success :

```json
{
   "data": {
      "username": "kmlz",
      "name": "Khairul Akmal"
   }
}
```

Response Body Error :

```json
{
   "errors": "Username already registered"
}
```

#### Login User API

```http
POST /api/users/login
```

Request Body :

```json
{
   "username": "kmlz",
   "password": "rahasia"
}
```

Response Body Success :

```json
{
   "data": {
      "token": "unique-token"
   }
}
```

Response Body Error :

```json
{
   "errors": "Username or password wrong"
}
```

#### Update User API

```http
PATCH /api/users/current
```

Headers :

-  Authorization : token

Request Body :

```json
{
   "name": "Khairul Akmal", // optional
   "password": "new password" // optional
}
```

Response Body Success :

```json
{
   "data": {
      "username": "kmlz",
      "name": "Khairul Akmal"
   }
}
```

Response Body Error :

```json
{
   "errors": "Name length max 100"
}
```

#### Get User API

```http
GET /api/users/current
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": {
      "username": "kmlz",
      "name": "Khairul Akmal"
   }
}
```

Response Body Error :

```json
{
   "errors": "Unauthorized"
}
```

#### Logout User API

```http
DELETE /api/users/logout
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": "OK"
}
```

Response Body Error :

```json
{
   "errors": "Unauthorized"
}
```

## Contact API Spec

#### Create Contact API

```http
POST /api/contacts
```

Headers :

-  Authorization : token

Request Body :

```json
{
   "first_name": "Khairul",
   "last_name": "Akmal",
   "email": "mal@gmail.com",
   "phone": "086891264172"
}
```

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "first_name": "Khairul",
      "last_name": "Akmal",
      "email": "mal@gmail.com",
      "phone": "086891264172"
   }
}
```

Response Body Error :

```json
{
   "errors": "Email is not valid format"
}
```

#### Update Contact API

```http
PUT /api/contacts/:id
```

Headers :

-  Authorization : token

Request Body :

```json
{
   "first_name": "Khairul",
   "last_name": "Akmal",
   "email": "mal@gmail.com",
   "phone": "086891264172"
}
```

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "first_name": "Khairul",
      "last_name": "Akmal",
      "email": "mal@gmail.com",
      "phone": "086891264172"
   }
}
```

Response Body Error :

```json
{
   "errors": "Email is not valid format"
}
```

#### Get Contact API

```http
GET /api/contacts/:id
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "first_name": "Khairul",
      "last_name": "Akmal",
      "email": "mal@gmail.com",
      "phone": "086891264172"
   }
}
```

Response Body Error :

```json
{
   "errors": "Contact is not found"
}
```

#### Search Contact API

```http
GET /api/contacts
```

Headers :

-  Authorization : token

Query params :

-  name : Search by first_name or last_name, using like, optional
-  email : Search by email, using like, optional
-  phone : Search by phone, using like, optional
-  page : number of page, default 1
-  size : size per page, default 10

Response Body Success :

```json
{
   "data": [
      {
         "id": 1,
         "first_name": "Khairul",
         "last_name": "Akmal",
         "email": "mal@gmail.com",
         "phone": "086891264172"
      },
      {
         "id": 2,
         "first_name": "Khairul",
         "last_name": "Akmal",
         "email": "mal@gmail.com",
         "phone": "086891264172"
      }
   ],
   "paging": {
      "page": 1,
      "total_page": 3,
      "total_item": 30
   }
}
```

Response Body Error :

```json
{
   "errors": "Contact is not found"
}
```

#### Remove Contact API

```http
DELETE /api/contacts/:id
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": "OK"
}
```

Response Body Error :

```json
{
   "errors": "Contact is not found"
}
```

## Address API Spec

#### Create Address API

```http
POST /api/contacts/:contactId/addresses
```

Headers :

-  Authorization : token

Request Body :

```json
{
   "street": "Jalan Rakyat Bunga",
   "city": "Kota Jakarta",
   "province": "DKI Jakarta",
   "country": "Indonesia",
   "postal_code": "135791"
}
```

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "street": "Jalan Rakyat Bunga",
      "city": "Kota Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "135791"
   }
}
```

Response Body Error :

```json
{
   "errors": "Country is required"
}
```

#### Update Address API

```http
PUT /api/contacts/:contactId/addresses/addressId
```

Headers :

-  Authorization : token

Request Body :

```json
{
   "street": "Jalan Rakyat Bunga",
   "city": "Kota Jakarta",
   "province": "DKI Jakarta",
   "country": "Indonesia",
   "postal_code": "135791"
}
```

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "street": "Jalan Rakyat Bunga",
      "city": "Kota Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "135791"
   }
}
```

Response Body Error :

```json
{
   "errors": "Country is required"
}
```

#### Get Address API

```http
GET /api/contacts/:contactId/addresses/addressId
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": {
      "id": 1,
      "street": "Jalan Rakyat Bunga",
      "city": "Kota Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "135791"
   }
}
```

Response Body Error :

```json
{
   "errors": "contact is not found"
}
```

#### List Addresses API

```http
GET /api/contacts/:contactId/addresses
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": [
      {
         "id": 1,
         "street": "Jalan Rakyat Bunga",
         "city": "Kota Jakarta",
         "province": "DKI Jakarta",
         "country": "Indonesia",
         "postal_code": "135791"
      },
      {
         "id": 2,
         "street": "Jalan Rakyat Bunga",
         "city": "Kota Jakarta",
         "province": "DKI Jakarta",
         "country": "Indonesia",
         "postal_code": "135791"
      }
   ]
}
```

Response Body Error :

```json
{
   "errors": "contact is not found"
}
```

#### Remove Address API

```http
DELETE /api/contacts/:contactId/addresses/addressId
```

Headers :

-  Authorization : token

Response Body Success :

```json
{
   "data": "OK"
}
```

Response Body Error :

```json
{
   "errors": "address is not found"
}
```
