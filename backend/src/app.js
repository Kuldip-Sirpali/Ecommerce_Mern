import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());
const whitelist = [process.env.FRONTEND_URL, process.env.ADMIN_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable credentials
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
  sameSite: "None",
  secure: true,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce server");
});

//custom middlewares
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/store", productRouter);
export { app };
