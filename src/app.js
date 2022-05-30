import path from "path";
import express from "express";
import productsRoutes from "./routes/products.routes";
import carritoRoutes from "./routes/carrito.routes";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/productos", productsRoutes);
app.use("/api/carrito", carritoRoutes);
app.get("*", function (req, res) {
  res.status(404).send({
    status: "error",
    data: "404: Page not found",
  });
});

// static files
app.use(express.static(path.join(__dirname, "public")));

export default app;
