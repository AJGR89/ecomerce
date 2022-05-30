# README

---

## PROYECTO E-COMMERCE

---

Desarrollo backend curso coderhouse

## API ENDOPOINTS

### RUNING PROJECT

    npm run dev

---

### ENVIORMENT VARIABLES

- **CONNECTION PORT** server port
  PORT

- **TYPE USER: Admin-> true | user-> false** to simulate user type
  TYPE_USER=true

- **SOURCE DATA:** for select origin data persintace
  SOURCE_DATA=FILE_SYSTEM
  SOURCE_DATA=FIREBASE
  SOURCE_DATA=MONGODB

- **Firesore key location** for set path of key firestore
  FIRESTORE_FILE

### Products routes

---

- **GET api/productos/?id ->** get a product by id
- **GET api/productos/ ->** get all products
  - _response example:_
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "4cuKfozb4xk2D1W7nVC6",
        "data": {
          "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
          "description": "Mouse inalámbrico Logitech",
          "stock": 20,
          "name": "Mouse rosa",
          "sku": 3030,
          "price": 1558
        }
      }
    ]
  }
  ```
- **POST api/productos/ ->** add a product
  - _request body example:_
  ```json
  {
    "name": "Mouse amarillo",
    "description": "Mouse inalámbrico Logitech",
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
    "price": 1558,
    "stock": 20,
    "sku": 3030
  }
  ```
  - _response example:_
  ```json
  {
    "status": "success",
    "data": "producto agregado"
  }
  ```
- **PUT api/productos/:id ->** update product by id
  - _request body example:_
  ```json
  {
    "name": "Mouse amarillo",
    "description": "Mouse inalámbrico Logitech",
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
    "price": 1558,
    "stock": 20,
    "sku": 3030
  }
  ```
  - _response example:_
  ```json
  {
    "status": "succsess",
    "data": "producto 950OS9b5e9r8o1OVTvcy actualizado"
  }
  ```
- **DELETE api/productos/:id ->** delete product by id
  - \*_response example:_
  ```json
  {
    "status": "succsess",
    "data": "producto 950OS9b5e9r8o1OVTvcy actualizado"
  }
  ```


---

### Carrito routes

---

- **POST api/carrito/ ->** create carrito
  - _response example:_
  ```json
    {
    "status": "success",
    "data": {
    "id": "E2YQNZxZ8l0SVQXl5mJd"
    }
    }
    ```
- **DELETE api/carrito/:id ->** delete carrito by id
  - _request example:_ /api/carrito/Mh6Dbz5ZcGSn6BkRUbLA
  - _response example:_
  ```json
    {
    "status": "succsess",
    "data": "carrito Mh6Dbz5ZcGSn6BkRUbLA eliminado"
    }
    ```
- _GET api/carrito/:id/productos ->_ get all products of one carrito
  - _request example:_ /api/carrito/0S7LiSDdSyaFJUmvh3UB/productos
  - _response example:_
  ```json
    {
    "status": "success",
    "data": {
    "products": [
    {
    "id": "950OS9b5e9r8o1OVTvcy",
    "data": {
    "stock": 222,
    "name": "Mouse verde",
    "price": 1349,
    "sku": 7070,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
    "description": "Mouse inalámbrico Logitech"
    }
    }]}}
    ```
- **POST api/carrito/:id/productos ->** add product to carrito using id carrito an id product
  - _request body example:_
  ```json
    {
    "id":"vM5jCh3VskLEgJF2QOy6"
    }
    ```
  - _response example:_
  ```json
    {
    "status": "success",
    "data": "producto agregado"
    }
    ```
- **DELETE api/carrito/:id/productos ->** delete product of carrito using id product and id carrito
  - _request example:_ /api/carrito/E2YQNZxZ8l0SVQXl5mJd/productos/HsCZNCaPmUHXZUG2Mu20
  - _response example:_
    ```json
    {
    "status": "success",
    "data": "producto eliminado"
    }
    ```


