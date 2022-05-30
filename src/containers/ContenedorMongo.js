import { connect, mongoose } from "mongoose";
import { myProducts } from "../daos/productos.dao";
import { MONGODB_URI } from "../config";
import Product from "../models/Product"
import Carrito from "../models/Carrito"
import { myCarritos } from "../database";

// CLASS PRODUCTS MONGO
export class ProductosMongo {
  /* CONSTRUCTOR */
  constructor() {
    try {
        if(mongoose.connection.readyState == 0)
        {
            const db = connect(MONGODB_URI);
            console.log("DB connected to MONGO");
        }
      } catch (error) {
        console.log(error);
      }
  }

  /* SAVE ELEMENT */
  async save(product) {
    try {
      const newProduct =  await Product.create(product);
      return newProduct;
    } catch (error) {
      console.log("[save()]: could not save object  ", error);
      return null;
    }
  }

  /* GET ELEMENT */
  async getById(id) {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log(error)
        return null;
    }
  }

  /* GET ELEMENTS */
  async getAll() {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.log(error)
    }

  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
        const product = await Product.findByIdAndDelete(id);
        return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE ELEMENTS */
  async deleteAll() {
    try {
        const product = await Product.deleteMany({});
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

  /* UPDATE ELEMENT */
  async updateById(id, product) {
    try {
      const productUp = await Product.findByIdAndUpdate(id, product);  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

// CLASS CARRITO MONGO
export class CarritoMongo {
  /* CONSTRUCTOR */
  constructor() {
    try {
        if(mongoose.connection.readyState == 0)
        {
            const db = connect(MONGODB_URI);
            console.log("DB connected to", db.connection);
        }
      } catch (error) {
        console.log(error);
      }
  }

  /* CREATE ELEMENT */
 async create() {
    try {
      const carrito = await Carrito.create({});
      return carrito._id;
    } catch (error) {
      console.log("could not create carrito");
      return null;
    }
  }

  /* DELETE ELEMENT */
async deleteById(id) {
    try {
      const carrito = await Carrito.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET ELEMENT BY ID */
async  getCarritoById(id) {
    try {
        const carrito = await Carrito.findById(id);
        return carrito;
      } catch (error) {
        console.log(error);
        return false;
      }
  }

    /* GET ALL */
async  getAll() {
  try {
      const carritos = await Carrito.find();
      
      return carritos;
    } catch (error) {
      console.log(error);
      return false;
    }
}


  /* GET PRODUCTOS FROM ID CARRITO */
async getProductsFromCarritoId(id) {
    let carrito = await Carrito.findById(id);
    console.log("Carrito: ",carrito)
    if (carrito == null) return [];
    console.log("Productos: ",carrito.products)
    return carrito.products;
  }

  /* ADD PRODUCT*/
async addProduct(id, id_prod){
    try {
        const product = await myProducts.getById(id_prod)
        console.log("product -->",product);

        if(product == null) return false;
        const carrito = await this.getCarritoById(id);
        const products = [...carrito.products];
        // console.log("products -->",products);
        // console.log("carrito -->",carrito);

        if(carrito == false) return false;
        const newProducts = products.push(product);
        console.log("\n\n");
        console.log("newProducts -->",newProducts);
        const carritoUp = await Carrito.findByIdAndUpdate(id,{products: products});
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
        if(carrito == false) return false;
        const products = [...carrito.products];
        // console.log(" products1 -->",products)

        let index4delete = null;
        products.forEach((el, index) => {
          if (el._id == id_prod) {
            index4delete = index;
          }
        });
        if (index4delete != null) {
          products.splice(index4delete, 1);
          // console.log(" products -->",products)
          const carritoUp = await Carrito.findByIdAndUpdate(id,{products: products});
          return true;
        }else{
          return false;
        }

    } catch (error) {
        console.log(error);
      return false;
    }
  }
}
