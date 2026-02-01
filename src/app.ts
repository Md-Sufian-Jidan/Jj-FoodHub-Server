import express from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { notFound } from "./middlewares/notFound";
import errorHandler from "./middlewares/globalErrorHandler";
import router from "./modules/routes";
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}));

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/api/v1', router);

app.get("/", (req, res) => {
    // console.log("Jj FOODHUB is running on port");
});

app.use(notFound);
app.use(errorHandler);
export default app;