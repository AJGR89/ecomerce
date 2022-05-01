import { TYPE_USER } from "../index";

export const checkAuth = (req, res, next) => {
  if (!TYPE_USER) {
    const response = {
        status:"error",
        data: `Ruta: ${req.baseUrl} inaccesible`
    };
    res.status(401).json(response);
    return;
  }
  next();
};
