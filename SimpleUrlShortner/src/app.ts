import path from "node:path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import healthRoutes from "./routes/health.routes";
import urlRoutes from "./routes/url.routes";

const app = express();
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", healthRoutes);
app.use("/", urlRoutes);

export default app;