import { SOURCE_DATA } from "../config";

export let myCarritos;

console.log(`${SOURCE_DATA} is source of data`);
if (SOURCE_DATA == "FILE_SYSTEM") {
  import("../containers/ContenedorArchivo")
    .then(({ CarritoArchivo }) => {
      myCarritos = new CarritoArchivo("carrito.txt");
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "MONGODB") {
  import("../containers/ContenedorMongo")
    .then(({ CarritoMongo }) => {
      myCarritos = new CarritoMongo();
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "FIREBASE") {
    import("../containers/ContenedorFirestore")
    .then(({ CarritoFirestore}) => {
      myCarritos = new CarritoFirestore('carritos');
    })
    .catch((error) => {
      console.log(error);
    });
} else if (SOURCE_DATA == "MY_SQL") {
} else if (SOURCE_DATA == "SQLITE") {
  import("../containers/ContenedorSqlite")
  .then(({ CarritoSqlite}) => {
    const {db_sqlite3} = require('../containers/config')
    myCarritos = new CarritoSqlite(db_sqlite3,'carritos','products-carrito');
  })
  .catch((error) => {
    console.log(error);
  });
}
