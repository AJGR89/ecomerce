import { SOURCE_DATA } from "../config";

export let myProducts;

if (SOURCE_DATA == "FILE_SYSTEM") {
  import("../containers/ContenedorArchivo")
    .then(({ ProductosArchivo }) => {
      myProducts = new ProductosArchivo("productos.txt");
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "MONGODB") {
  import("../containers/ContenedorMongo")
    .then(({ ProductosMongo }) => {
      myProducts = new ProductosMongo();
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "FIREBASE") {
    import("../containers/ContenedorFirestore")
    .then(({ ProductosFirestore }) => {
      myProducts = new ProductosFirestore('products');
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "MY_SQL") {
} else if (SOURCE_DATA == "SQLITE") {
  import("../containers/ContenedorSqlite")
  .then(({ProductosSqlite})=>{
    const {db_sqlite3} = require('../containers/config')
    myProducts = new ProductosSqlite(db_sqlite3,'products');
  })
  .catch()
}
