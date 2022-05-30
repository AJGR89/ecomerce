import { response } from "express";
import { Router } from "express";
import { myCarritos} from "../daos/carrito.dao";
import {myProducts} from "../daos/productos.dao"

const router = Router();

//ADD CARRITO
router.post("/", async (req, res) => {
  try {
    const idCarrito = await myCarritos.create();
    if (idCarrito) {
      const response = {
        status: "success",
        data: {
          id: idCarrito,
        },
      };
      res.status(201).json(response);
    } else {
      const response = {
        status: "error",
        data: "carrito no creado",
      };
      res.status(500).json(response);
    }
  } catch (error) {
    console.log(error);
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

//DELETE CARRITO
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const del = myCarritos.deleteById(id);
    if (del) {
      const response = {
        status: "succsess",
        data: `carrito ${id} eliminado`,
      };
      res.status(200).json(response);
    } else {
      const response = {
        status: "error",
        data: `carrito ${id} no eliminado`,
      };
      res.status(500).json(response);
    }
  } catch (error) {
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

// GET ALL
router.get("/",async(req,res)=>{
  try {
    const carritos = await myCarritos.getAll();
    const response = {
      status: "success",
      data: {
        carritos: carritos,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

//GET PRODUCTS FROM CARRITO
router.get("/:id/productos", async (req, res) => {
  try {
    const id = req.params.id;
    const carrito = await myCarritos.getCarritoById(id);
    if (carrito == null) {
      const response = {
        status: "error",
        data: "Carrito no existe",
      };
      res.status(404).json(response);
      return;
    }
    const products = carrito.data.products;
    const response = {
      status: "success",
      data: {
        products: products,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

//ADD PRODUCT TO CARRITO
router.post("/:id/productos", async (req, res) => {
  try {
    const id = req.params.id;
    const id_prod = req.body.id;
    
    const carrito = await myCarritos.getCarritoById(id);
    const product = await myProducts.getById(id_prod);

    // console.log("carrito --> ",carrito);
    // console.log("product --> ",product);

    if (carrito == null) {
      const response = {
        status: "error",
        data: "Carrito no encontrado",
      };
      res.status(404).json(response);
      return;
    }
    if (product == null) {
      const response = {
        status: "error",
        data: "Producto no encontrado",
      };
      res.status(404).json(response);
      return;
    }
    if (myCarritos.addProduct(id, id_prod)) {
      const response = {
        status: "success",
        data: `producto agregado`,
      };
      res.status(200).json(response);
      return;
    } else {
      const response = {
        status: "error",
        data: "Producto no agregado",
      };
      res.status(500).json(response);
    }
  } catch (error) {
      console.log(error)
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

//DELETE A PRODUCT OF CARRITO
router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const id = req.params.id;
    const id_prod = req.params.id_prod;

    console.log("id carrito: ",id,"\nid producto: ",id_prod);

    const carrito = await myCarritos.getCarritoById(id);
    const product = await myProducts.getById(id_prod);
    if (carrito == null) {
      const response = {
        status: "error",
        data: "Carrito no encontrado",
      };
      res.status(404).json(response);
      return;
    }
    if (product == null) {
      const response = {
        status: "error",
        data: "Producto no encontrado",
      };
      res.status(404).json(response);
      return;
    }
    if(myCarritos.deleteProductFromCarritoByID(id,id_prod)){
        const response = {
            status: "success",
            data: `producto eliminado`,
          };
          res.status(200).json(response);
    }else{
        const response = {
            status: "error",
            data: "Producto no agregado",
          };
          res.status(500).json(response);
    }
  } catch (error) {
    console.log(error)
    const response = {
      status: "error",
      data: "error",
    };
    res.status(500).json(response);
  }
});

export default router;
