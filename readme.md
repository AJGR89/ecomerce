# README

---

## PROYECTO E-COMMERCE

---

Desarrollo backend curso coderhouse

## API ENDOPOINTS

### RUNING PROJECT

    please use: npm run dev

---

### ENVIORMENT VARIABLES

1. **CONNECTION PORT** server port
   PORT

2. **TYPE USER: Admin-> true | user-> false** to simulate user type
   TYPE_USER=true

3. **SOURCE DATA:** for select origin data persintace
   SOURCE_DATA=FILE_SYSTEM
   SOURCE_DATA=FIREBASE
   SOURCE_DATA=MONGODB

4. **Firesore key location** for set path of key firestore
   FIRESTORE_FILE

### Products routes

---

1. **GET api/productos/?id ->** get a product by id
2. **GET api/productos/ ->** get all products
   2.1. **response example:**
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
   }]
   }
3. **POST api/productos/ ->** add a product
   3.1. **request body example:**
   {
   "name": "Mouse amarillo",
   "description":"Mouse inalámbrico Logitech",
   "thumbnail":
   "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
   "price": 1558,
   "stock": 20,
   "sku": 3030
   }
   3.2. **response example:**
   {
   "status": "success",
   "data": "producto agregado"
   }
4. **PUT api/productos/:id ->** update product by id
   4.1. **request body example:**
   {
   "name": "Mouse amarillo",
   "description":"Mouse inalámbrico Logitech",
   "thumbnail":
   "https://http2.mlstatic.com/D_NQ_NP_743885-MLA42361842481_062020-O.webp",
   "price": 1558,
   "stock": 20,
   "sku": 3030
   }
   4.2. **response example:**
   {
   "status": "succsess",
   "data": "producto 950OS9b5e9r8o1OVTvcy actualizado"
   }
5. **DELETE api/productos/:id ->** delete product by id
   5.1. **response example:**
   {
   "status": "succsess",
   "data": "producto 950OS9b5e9r8o1OVTvcy actualizado"
   }

---

### Carrito routes

---

1. **POST api/carrito/ ->** create carrito
   1.1. **response example:**
   {
   "status": "success",
   "data": {
   "id": "E2YQNZxZ8l0SVQXl5mJd"
   }
   }
2. **DELETE api/carrito/:id ->** delete carrito by id
   2.1 **request example:** /api/carrito/Mh6Dbz5ZcGSn6BkRUbLA
   2.2 **response example:**
   {
   "status": "succsess",
   "data": "carrito Mh6Dbz5ZcGSn6BkRUbLA eliminado"
   }
3. **GET api/carrito/:id/productos ->** get all products of one carrito
   3.1 **request example:** /api/carrito/0S7LiSDdSyaFJUmvh3UB/productos
   3.2 **response example:**
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
4. **POST api/carrito/:id/productos ->** add product to carrito using id carrito an id product
   4.1. **request body example:**
   {
   "id":"vM5jCh3VskLEgJF2QOy6"
   }
   4.2 **response example:**
   {
   "status": "success",
   "data": "producto agregado"
   }
5. **DELETE api/carrito/:id/productos ->** delete product of carrito using id product and id carrito
   5.1 **request example:** /api/carrito/E2YQNZxZ8l0SVQXl5mJd/productos/HsCZNCaPmUHXZUG2Mu20
   5.2 **response example:**
   {
   "status": "success",
   "data": "producto eliminado"
   }
