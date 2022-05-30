import fs from "fs";
import { myProducts } from "../daos/productos.dao";

// CLASS PRODUCTS
export class ProductosArchivo {
  /* CONSTRUCTOR */
  constructor(name) {
    this.nameFile = name;
    this._uriFile = `./src/files/${this.nameFile}`;
    this.uriSKU = "./src/files/lastid.txt";
    this._emptyFile;
    this.sku;
    this._products = [];

    try {
      this.sku = fs.readFileSync(this.uriSKU, "utf-8");
    } catch (error) {
      console.log(
        "***********************************************************************"
      );
      fs.writeFileSync(this.uriSKU, "1");
      this.sku = 0;
    }

    try {
      const products = fs.readFileSync(this._uriFile, "utf-8");
      if (products == "") {
        this._products = [];
      } else {
        this._products = JSON.parse(products);
      }
      // console.log("incosntructor, products: ", products);
    } catch (error) {
      console.log(error);
      this._products = [];
    }
  }

  /* SAVE ELEMENT */
  save(product) {
    try {
      this.sku++;
      const newProduct = {
        _id: makeid(10),
        ...product,
        sku: this.sku,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      this._products.push(newProduct);
      fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
      fs.writeFileSync(this.uriSKU, this.sku.toString());
      return newProduct;
    } catch (error) {
      console.log("[save()]: could not save object");
      return null;
    }
  }

  /* GET ELEMENT */
  getById(id) {
    let element = null;
    this._products.forEach((el, index) => {
      if (el._id === id) {
        element = el;
      }
    });
    return element;
  }

  /* GET ELEMENTS */
  getAll() {
    try {
      const content = fs.readFileSync(this._uriFile, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENT */
  deleteById(id) {
    let index4delete = null;
    try {
      this._products.forEach((el, index) => {
        if (el._id === id) {
          index4delete = index;
        }
      });
      if (index4delete != null) {
        this._products.splice(index4delete, 1);
        fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENTS */
  deleteAll() {
    try {
      const ready = fs.openSync(this._uriFile, "w");
      this._products = [];
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

  /* UPDATE ELEMENT */
  updateById(id, product) {
    const Id = id;
    let index4update = null;

    try {
      this._products.forEach((el, index) => {
        if (el._id === Id) {
          index4update = index;
        }
      });
      if (index4update != null) {
        this._products[index4update]._id = Id;
        this._products[index4update].name = product.name;
        this._products[index4update].description = product.description;
        this._products[index4update].thumbnail = product.thumbnail;
        this._products[index4update].price = product.price;
        this._products[index4update].stock = product.stock;
        this._products[index4update].updated_at = Date.now();
        fs.writeFileSync(this._uriFile, JSON.stringify(this._products));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}

// CLASS CARRITO
export class CarritoArchivo {
  /* CONSTRUCTOR */
  constructor(name) {
    this.nameFile = name;
    this._uriFile = `./src/files/${this.nameFile}`;
    this._carritos = [];

    try {
      const carritos = fs.readFileSync(this._uriFile, "utf-8");
      if (carritos == "") {
        this._carritos = [];
      } else {
        this._carritos = JSON.parse(carritos);
      }
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
  getAll(){
    try {
      return this._carritos;
    } catch (error) {
      console.log(error)
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
      let product = myProducts.getById(id_prod);
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

// AUXILIAR FUNCTION makeid
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

