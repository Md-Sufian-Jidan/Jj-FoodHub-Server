import express from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { notFound } from "./middlewares/notFound";
import { mealRouter } from "./modules/meals/meal.route";
import { categoryRouter } from "./modules/category/category.route";
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000" || "http://localhost:5000",
    credentials: true
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/v1/meal', mealRouter);
app.use('/api/v1/category', categoryRouter);

app.get("/", (req, res) => {
    console.log("Jj FOODHUB is running on port");
});

app.use(notFound);
export default app;