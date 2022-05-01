import fs from "fs";
import { myContenedor } from "../database";

class Carrito {
  /* CONSTRUCTOR */
  constructor() {
    this._uriFile = "./src/files/carrito.txt";
    this._carritos = [];

    try {
      const carritos = fs.readFileSync(this._uriFile, "utf-8");
      if (carritos == "") {
        this._carritos = [];
      } else {
        this._carritos = JSON.parse(carritos);
      }
      // console.log("incosntructor, products: ", products);
    } catch (error) {
      console.log(error);
      this._carritos = [];
    }
  }

  /* CREATE ELEMENT */
  create() {
    try {
      this.sku++;
      const newCarrito = {
        _id: makeid(10),
        products: [],
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      this._carritos.push(newCarrito);
      fs.writeFileSync(this._uriFile, JSON.stringify(this._carritos));
      return newCarrito._id;
    } catch (error) {
      console.log("could not create carrito");
      return null;
    }
  }

  /* DELETE ELEMENT */
  deleteById(id) {
    let index4delete = null;
    try {
      this._carritos.forEach((el, index) => {
        if (el._id === id) {
          index4delete = index;
        }
      });
      if (index4delete != null) {
        this._carritos.splice(index4delete, 1);
        fs.writeFileSync(this._uriFile, JSON.stringify(this._carritos));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  /* GET ELEMENT BY ID*/
  getCarritoById(id) {
    let carrito = null;
    this._carritos.forEach((el, index) => {
      if (el._id === id) {
        carrito = el;
      }
    });

    return carrito;
  }

  /* GET PRODUCTOS FROM ID CARRITO */
  getProductsFromCarritoId(id) {
    let carrito = this.getCarritoById(id);
    if (carrito == null) return [];
    return carrito.products;
  }

  /* ADD PRODUCT*/
  addProduct(id, id_prod) {
    try {
      let index4update = null;
      // let carrito = this.getCarritoById(id);
      let product = myContenedor.getById(id_prod);
      this._carritos.forEach((el, index) => {
        if (el._id === id) {
          index4update = index;
        }
      });
      if (index4update != null) {
        this._carritos[index4update].products.push(product);
        this._carritos[index4update].updated_at = Date.now();
        fs.writeFileSync(this._uriFile, JSON.stringify(this._carritos));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  deleteProductFromCarritoByID(id, id_prod) {
    let indexCarrito = null;
    let indexProduct = null;

    this._carritos.forEach((el, index) => {
      if (el._id === id) {
        indexCarrito = index;
      }
    });
    if (indexCarrito != null) {
      let products = this._carritos[indexCarrito].products;
      if (products.length > 0) {
        products.forEach((el, index) => {
          if (el._id === id_prod) {
            indexProduct = index;
          }
        });
        if (indexProduct != null) {
          this._carritos[indexCarrito].products.splice(indexProduct, 1);
        }
        this._carritos[indexCarrito].updated_at = Date.now();
        fs.writeFileSync(this._uriFile, JSON.stringify(this._carritos));
      }
      return true;
    }
    return false;
  }
}

const makeid = (length) => {
  try {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default Carrito;
