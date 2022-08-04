import { Router } from "express";
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const router = Router();
const codes = [1, 2, 3, 5, 10, 58];

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage })

router.get("/", (req, res) => {
  res.render("index");
});

/** LOGIN */
router.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

/** LOGIN ERROR */
router.get("/loginerror", (req, res) => {
  res.render("loginErr", { layout: false });
});

/* REGISTER */
router.get("/register", (req, res) => {
  res.render("register", { codes: codes, layout: false });
});
router.post("/register",upload.single("avatar"),async(req,res)=>{
    // const { filename: image } = req.file;
  const {firstName,username,password} = req.body;
    console.log(req)
    console.log(firstName,username,password)

    // await sharp(req.file.path)
    //  .resize(200, 200)
    //  .jpeg({ quality: 90 })
    //  .toFile(
    //      path.resolve(req.file.destination,'resized',image)
    //  )
    //  fs.unlinkSync(req.file.path)
   
    res.redirect('/auth/login');
})

/* REGISTER ERROR */
router.get("/registererror", (req, res) => {
  res.render("registerErr", { layout: false });
});

export default router;
