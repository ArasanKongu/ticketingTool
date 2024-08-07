import express from "express";

import routes from "./routes/routes";
import errorHandler from "../backend/middelware/errorHandle";

const app = express();
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
