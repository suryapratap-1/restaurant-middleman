import express from "express";
import expressProxy from "express-http-proxy";

const app = express();

app.use("/api/v1/user", expressProxy("http://localhost:8001"))
app.use("/api/v1/order", expressProxy("http://localhost:8002"))

app.listen(8000, () => {
    console.log('Gateway server listening on port 8000')
})