import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./DB/index.db.js";
dotenv.config();
connectDB()
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log(`Server is listening on the port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });
