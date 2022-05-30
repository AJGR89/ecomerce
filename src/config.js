import path from "path";
import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;

// export const TYPE_USER= process.env.TYPE_USER || false;

export const SOURCE_DATA = process.env.SOURCE_DATA || FILE_SYSTEM;

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://devuser:devpassword@localhost:27017/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";

export const FIRESTORE_FILE = process.env.FIRESTORE_FILE || path.resolve(__dirname,"./ecommerce-14582-firebase-adminsdk-vhgwn-3da1cb97ff.json")
