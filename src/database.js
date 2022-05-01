import Contenedor from "./libs/Contenedor";
import Carrito from "./libs/Carrito";

const product1 = {
  name: "Taladro",
  description:"Taladro 100Watts",
  thumbnail:
  "https://http2.mlstatic.com/D_NQ_NP_896351-MLA40518149904_012020-O.webp",
  price: 2500,
  stock: 100,
};

const product2 = {
  name: "Esmeril Angular",
  description:"Esmeril Balck",
  thumbnail:
  "https://http2.mlstatic.com/D_NQ_NP_764739-MLA46544980918_062021-O.webp",
  price: 4500,
  stock: 10,
};
const product3 = {
  name: "Sensitiva",
  description:"Sensitiva 100Watts",
  thumbnail:
  "https://http2.mlstatic.com/D_NQ_NP_919851-MLA48051950156_102021-O.webp",
  price: 450,
  stock: 500,
};

export const myContenedor = new Contenedor("productos.txt");
export const myCarritos = new Carrito();
// myContenedor.save(product1);
//  myContenedor.save(product2);
// myContenedor.save(product3);


