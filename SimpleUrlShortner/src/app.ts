import express from "express";
import healthRoutes from "./routes/health.routes";
import urlRoutes from "./routes/url.routes";

const app = express();

app.use(express.json());
app.use("/", healthRoutes);
app.use("/", urlRoutes);

export default app;