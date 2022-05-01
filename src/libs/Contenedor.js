import fs from "fs";

class Contenedor {
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

export default Contenedor;
