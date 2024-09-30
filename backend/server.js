import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({path: "backend/config/config.env"});
}

connectDatabase();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
