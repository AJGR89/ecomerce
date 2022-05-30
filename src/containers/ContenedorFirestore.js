import { FIRESTORE_FILE } from "../config";
import { myProducts } from "../daos/productos.dao";
let admin = require("firebase-admin");
const serviceAccount = require(FIRESTORE_FILE);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// CLASS PRODUCTS FIRESTORE
export class ProductosFirestore {
  /* CONSTRUCTOR */
  constructor(collection) {
    try {
      this.collection = db.collection(collection);
      console.log(`Base conectada con la collection ${collection}`);
    } catch (error) {
      console.log(error);
    }
  }

  /* SAVE ELEMENT */
  async save(product) {
    try {
      let doc = this.collection.doc();
      console.log(product);
      const newProduct = await doc.create(product);
      return newProduct;
    } catch (error) {
      console.log("[save()]: could not save object  ", error);
      return null;
    }
  }

  /* GET ELEMENT */
  async getById(id) {
    try {
      let products = await this.collection.get();
      products = products.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      let product = products.find((elem) => elem.id == id);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /* GET ELEMENTS */
  async getAll() {
    try {
      let products = await this.collection.get();
      products = products.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      let doc = this.collection.doc(`${id}`);
      let item = doc.delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE ELEMENTS */
  async deleteAll() {
    try {
      let doc = this.collection.doc();
      let item = doc.delete();
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

  /* UPDATE ELEMENT */
  async updateById(id, product) {
    try {
      let doc = this.collection.doc(`${id}`);
      let item = await doc.update(product);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

// CLASS CARRITO FIRESTORE
export class CarritoFirestore {
  /* CONSTRUCTOR */
  constructor(collection) {
    try {
      this.collection = db.collection(collection);
      console.log(`Base conectada con la collection ${collection}`);
    } catch (error) {
      console.log(error);
    }
  }

  /* CREATE ELEMENT */
  async create() {
    try {
      const carrito = {
        products: [],
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      let doc = this.collection.doc();
      const item = await doc.create(carrito);

      let newCarrito = await this.getAll();
      console.log("create: ", newCarrito)
      return newCarrito[newCarrito.length-1].id;
    } catch (error) {
      console.log("could not create carrito", error);
      return null;
    }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      let doc = this.collection.doc(`${id}`);
      let item = doc.delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET ELEMENT BY ID */
  async getCarritoById(id) {
    try {
      let carritos = await this.collection.get();
      //   console.log("carritos-->",carritos)
      carritos = carritos.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      let carrito = await carritos.find((elem) => elem.id == id);
      //   console.log("carrito-->",carrito)
      return carrito;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET ALL */
  async getAll() {
    try {
      let carritos = await this.collection.get();
      carritos = carritos.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      return carritos;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET PRODUCTOS FROM ID CARRITO */
  async getProductsFromCarritoId(id) {
    let carrito = await this.getCarritoById(id);
    console.log("Carrito: ", carrito);
    if (carrito == null) return [];
    console.log("Productos: ", carrito.products);
    return carrito.products;
  }

  /* ADD PRODUCT*/
  async addProduct(id, id_prod) {
    try {
      const product = await myProducts.getById(id_prod);
      // console.log("product -->", product);
      if (product == null) return false;
      let carrito = await this.getCarritoById(id);
      // console.log("carrito1 -->",carrito);
      if (carrito == false) return false;

      let products = carrito.data.products;
      products.push(product);

      const updated_at = Date.now();

      console.log("carrito2 -->",carrito);
      let doc = this.collection.doc(`${id}`);
      let item = await doc.update({
        products: products,
        updated_at: updated_at,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE PRODUCT*/
  async deleteProductFromCarritoByID(id, id_prod) {
    try {
      const carrito = await this.getCarritoById(id);
      if (carrito == false) return false;
      const products = [...carrito.data.products];
      console.log(" products1 -->", products);
      let index4delete = null;
      products.forEach((el, index) => {
        if (el.id == id_prod) {
          index4delete = index;
        }
      });
      if (index4delete != null) {
        products.splice(index4delete, 1);
        console.log(" products -->", products);
        const updated_at = Date.now();
        let doc = this.collection.doc(`${id}`);
        let item = await doc.update({
          products: products,
          updated_at: updated_at,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
