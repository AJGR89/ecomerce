import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3001;

// export const TYPE_USER= process.env.TYPE_USER || false;