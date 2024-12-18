import { app } from "./app";
import { config } from "./config/variables.config";
import { connectDB } from "./config/db.config";
import { authRouter } from "./routes/user.routes";

connectDB()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })

        app.use("/", authRouter)

    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });