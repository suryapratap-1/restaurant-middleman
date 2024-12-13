import { app } from "./app";
import { config } from "./config/variables.config";
import { connectDB } from "./config/db.config";
import { orderRouter } from "./routes/order.routes";

connectDB()
.then(() => {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    })

    app.use("/create", orderRouter)
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});