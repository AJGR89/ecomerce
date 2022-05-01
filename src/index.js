import app from "./app";
import {PORT} from './config'

export const TYPE_USER =  true; //true is Admin, false is user

app.listen(PORT, () => {
  console.log(`Server on port: http://localhost:${PORT}/`);
});
app.on("error", (error) => {
  console.log(error);
});
