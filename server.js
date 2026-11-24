import express from "express";
import vehiculesRoutes from "./routes/vehicules.js";
import journal from "./middlewares/journal.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(journal);
app.use("/vehicules", vehiculesRoutes);

app.use((req, res) => {
    res.status(404).json({ erreur: "Route introuvable" });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});