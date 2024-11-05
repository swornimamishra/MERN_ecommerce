import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import bodyParser from "express"; // Correctly importing body-parser
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from "./Routes/address.js";
import cors from 'cors';
import paymentRouter from './Routes/payment.js'


const app = express();

app.use(bodyParser.json()); // Using body-parser middleware

app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get("/", (req, res) => res.json({ message: "this is home route" }));

// user Router
app.use("/api/user", userRouter);

// product Router
app.use('/api/product',productRouter)


// cart router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// paymentrouter
app.use("/api/payment", paymentRouter);

mongoose
  .connect(
    "mongodb+srv://sushantmishra228:Rde7zCcK3f2k4LSh@cluster0.yfafr.mongodb.net/",
    {
      dbName: "MERN_ECopmmerce",
    }
  )
  .then(() => console.log("MongoDB Connected Successfully..!"))
  .catch((err) => console.log(err));

const port = 1000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
