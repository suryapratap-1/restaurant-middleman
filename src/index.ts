import { app } from "./app";
import { config } from "./config/variables.config";
import { connectDB } from "./database/db.connect";
import { userRouter } from "./routes/user.routes";

connectDB()
.then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    })

    app.use("/api/v1/user", userRouter)
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});