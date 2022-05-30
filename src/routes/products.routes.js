import { Router } from "express";
import {checkAuth} from "../middlewares/auth"
import {myProducts} from "../daos/productos.dao"

const router = Router();

//GET PRODUCT
router.get("/", async (req, res) => {
  try {
    const id = req.query.id;
    
    if (!id) 
    {
      const products = await myProducts.getAll();
      console.log("get all",products)
      const response = {
        status: "success",
        data: products
      }
      res.status(200).json(response);
      return
    } else 
    {
      const product = await myProducts.getById(id);
      console.log(product);
      if (product == null) {
        const response = {
          status: "error",
          msg: "producto no encontrado",
        }
        res.status(404).json(response);
        return;
      } else {
        const response = {
          status: "success",
          data: product,
        }
        res.status(200).json(response);
        return;
      }
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: error });
  }
});

//ADD PRODUCT
router.post("/", checkAuth ,async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await myProducts.save(product);

    if (newProduct != null) {
      const response={
        status:"success",
        data: "producto agregado"
      }
        res.status(200).json(response);
    } else {
      const response={
        status:"error",
        data: "producto no agregado"
      }
      res.status(500).json(response);
    }
  } catch (error) {
    console.log(error);
    const response={
      status:"error",
      data: "error"
    }
    res.status(500).json(response);
  }
});

//UPDATE BY ID
router.put("/:id", checkAuth , async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const updateProduct = myProducts.updateById(id, product);
    
    if (updateProduct) {
      const response={
        status:"succsess",
        data: `producto ${id} actualizado`
      }
      res.status(200).json(response);
      return;
    }
    const response={
      status:"error",
      data: `producto ${id} no actualizado`
    }
    return res.status(500).json(response);
  } catch (error) {
    console.log(error);
    const response={
      status:"error",
      data: "error"
    }
    res.status(500).json(response);
  }
});

//DELETE BY ID
router.delete("/:id", checkAuth , async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await myProducts.deleteById(id);
    if (deleteProduct) {
      const response={
        status:"succsess",
        data: `producto ${id} eliminado`
      }
      res.status(200).json(response);
    } else {
      const response={
        status:"error",
        data: `producto ${id} no eliminado`
      }
      res.status(500).json(response);
    }
  } catch (error) {
    const response={
      status:"error",
      data: "error"
    }
    res.status(500).json(response);
  }
});

export default router;
