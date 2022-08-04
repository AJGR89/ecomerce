import path from "path";
import express from "express";
import { create } from "express-handlebars";
import productsRoutes from "./routes/products.routes";
import carritoRoutes from "./routes/carrito.routes";
import authRoutes from "./routes/auth.routes";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "./models/User";
import { MONGODB_URI } from "./config";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      autoRemove: "interval",
      autoRemoveInterval: 1,
      ttl: 10 * 60,
    }),
    secret: "jlYoA9lJy0",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// views
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);

app.set("view engine", ".hbs");

//routes
app.use("/auth", authRoutes);
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
console.log(path.join(__dirname, "public"));

passport.use(
  "login",
  new Strategy((username, password, callback) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        console.log("User not found");
        return callback(null, false);
      }

      if (!validatePass(user, password)) {
        console.log("Invalid Password");
        return callback(null, false);
      }

      return callback(null, user);
    });
  })
);

passport.use(
  "register",
  new Strategy(
    { passReqToCallback: true },
    (req, username, password, callback) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log("Failed to register");
          return callback(err);
        }

        if (user) {
          console.log("user already exists");
          return callback(null, false);
        }

        console.log("BODY EN PASSPORT******************", req.body);

        const newUser = {
          firstName: req.body.firstName,
          address: req.body.lastName,
          email: req.body.email,
          age:req.body.age,
          username: username,
          password: createHash(password),
        };

        console.log(newUser);

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Failed to register");
            return callback(err);
          }

          console.log(userWithId);
          console.log("Register successful ");

          return callback(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id, callback);
});

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const validatePass = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export default app;
