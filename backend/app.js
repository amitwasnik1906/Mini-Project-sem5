import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// routes
import userRoute from "./routes/userRoute.js"
app.use("/api/v1/user", userRoute)

import authorityRoute from "./routes/authorityRoute.js"
app.use("/api/v1/authority", authorityRoute)

// middleware
import errorMiddleware from './middlewares/errorMiddleware.js';
app.use(errorMiddleware);

export default app