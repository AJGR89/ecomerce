import { myProducts } from "../daos/productos.dao";

// CLASS PRODUCTS SQLITE
export class ProductosSqlite {
  /* CONSTRUCTOR */
  constructor(db, tableName) {
    this.db = db;
    this.table_name = tableName;
    this.init = false;
  }

  /* CREATE TABLE */
  dbInit(db) {
    db.schema
      .createTable(this.table_name, (table) => {
        table.increments("id");
        table.string("name");
        table.string("description");
        table.string("thumbnail");
        table.integer("price");
        table.integer("stock");
        table.integer("sku");
        table.timestamp("create_at").defaultTo(this.db.fn.now());
      })
      .then(() => {
        this.init = true;
        console.log("error AQUII TRUE");
      })
      .catch((error) => {
        console.log("Constructor error: ", error);
        this.init = false;
      });
    // .finally(() => {
    //   db.destroy();
    // });
  }

  /* SAVE ELEMENT */
  async save(product) {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const newProduct = await this.db(this.table_name).insert(product);
      return newProduct;
    } catch (error) {
      console.log("[save()]: could not save object  ", error);
      return null;
    }
  }

  /* GET ELEMENT */
  async getById(id) {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const product = await this.db
        .from(this.table_name)
        .select("*")
        .where({ id: id });
      if (product.length == 0) return null;
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /* GET ELEMENTS */
  async getAll() {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const products = await this.db.from(this.table_name).select("*");
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const product = await this.db
        .from(this.table_name)
        .where({ id: id })
        .del();
      if (product.length == 0) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE ELEMENTS */
  async deleteAll() {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const product = await this.db.from(this.table_name).select("*").del();
    } catch (error) {
      console.log("[deleteAll()]: could not delete all elements");
    }
  }

  /* UPDATE ELEMENT */
  async updateById(id, product) {
    try {
      this.init = await this.db.schema.hasTable(this.table_name);
      if (this.init == false) {
        this.dbInit(this.db);
      }
      const productUp = await this.db
        .from(this.table_name)
        .where({ id: id })
        .update(product);
      console.log(productUp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

// CLASS CARRITO SQLITE
export class CarritoSqlite {
  /* CONSTRUCTOR */
  constructor(db, tableName, auxTable) {
    this.db = db;
    this.table_name = tableName;
    this.aux_table = auxTable;
    this.init_table = false;
    this.init_aux_table = false;
  }

  /* CREATE TABLE */
  dbInit(db) {
    if (this.init_table == false) {
      db.schema
        .createTable(this.table_name, (table) => {
          table.increments("id");
          table.string("c_id");
          table.timestamp("create_at").defaultTo(this.db.fn.now());
        })
        .then(() => {
          this.init_table = true;
          console.log("error AQUII TRUE");
        })
        .catch((error) => {
          console.log("Constructor error: ", error);
          this.init_table = false;
        });
      // .finally(() => {
      //   db.destroy();
      // });
    }

    if (this.init_aux_table == false && this.init_table == true) {
      db.schema
        .createTable(this.aux_table, (table) => {
          table.string("c_id").references(`${this.table_name}.c_id`);
          table.string("p_id").references(`${myProducts.table_name}.id`);
        })
        .then(() => {
          this.init_aux_table = true;
          console.log("error AUX TRUE");
        })
        .catch((error) => {
          console.log("Constructor error: ", error);
          this.init_aux_table = false;
        });
      // .finally(() => {
      //   db.destroy();
      // });
    }
  }

  /* CREATE ELEMENT */
  async create() {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const c_id = makeid(10);
      const carrito = await this.db(this.table_name).insert({
        c_id: c_id,
      });
      return c_id;
    } catch (error) {
      console.log("could not create carrito");
      return null;
    }
  }

  /* DELETE ELEMENT */
  async deleteById(id) {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const carrito = await this.db
        .from(this.table_name)
        .where({ c_id: id })
        .del();
      if (carrito.length == 0) return false;
      const products = await this.db
        .from(this.aux_table)
        .where({ c_id: id })
        .del();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET ELEMENT BY ID */
  async getCarritoById(id) {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      let carrito = await this.db
        .from(this.table_name)
        .select("*")
        .where({ c_id: id });
      if (carrito.length == 0) return null;
      const products = await this.getProductsFromCarritoId(carrito[0].c_id);

      carrito.products = products;

      console.log(carrito);
      //   console.log(products);

      return carrito;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET ALL */
  async getAll() {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const carritos = await this.db.from(this.table_name).select("*");
      return carritos;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* GET PRODUCTOS FROM ID CARRITO */
  async getProductsFromCarritoId(id) {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const products = await this.db
        .select(
          `${myProducts.table_name}.id`,
          `${myProducts.table_name}.name`,
          `${myProducts.table_name}.description`,
          `${myProducts.table_name}.thumbnail`,
          `${myProducts.table_name}.price`,
          `${myProducts.table_name}.stock`,
          `${myProducts.table_name}.sku`,
          `${myProducts.table_name}.create_at`
        )
        .from(myProducts.table_name)
        .join(
          this.aux_table,
          `${myProducts.table_name}.id`,
          "=",
          `${this.aux_table}.p_id`
        )
        .where({ c_id: id });

      //   console.log("products-->>", products);
      return products;
    } catch (error) {
      console.log("products-->>", error);
      return [];
    }
  }

  /* ADD PRODUCT*/
  async addProduct(id, id_prod) {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const rel = {
        c_id: id,
        p_id: parseInt(id_prod),
      };
      const newItem = await this.db(this.aux_table).insert(rel);
      if (newItem.length == 0) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /* DELETE PRODUCT*/
  async deleteProductFromCarritoByID(id, id_prod) {
    try {
      this.init_table = await this.db.schema.hasTable(this.table_name);
      this.init_aux_table = await this.db.schema.hasTable(this.aux_table);
      if (this.init_table == false || this.init_aux_table == false) {
        this.dbInit(this.db);
      }
      const query = await this.db
        .from(this.aux_table)
        .where({ c_id: id, p_id: id_prod })
        .del();
      if (query.length == 0) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
