import express from "express"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    // credentials: true
}));

app.get("/", (req, res) => {
    console.log("Jj FOODHUB is running on port");
});

export default app;