import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConfig } from "./src/config/dbConfig.js";
import { errorHandler } from "./src/helpers/errorHandler.js";
import AuthRoutes from "./src/routes/authRoute.js";
import BannerCardsRoutes from "./src/routes/bannerCardsRoute.js";
import GeneralInforRoutes from "./src/routes/generalInfoRoute.js";
import MessageRoutes from "./src/routes/messageRoute.js";
import SongRoutes from "./src/routes/songRoute.js";
import TestimonyRoutes from "./src/routes/testimonyRoute.js";
import SubscriberRoutes from "./src/routes/subscriberRoute.js";
import VisitorRoutes from "./src/routes/visitorRoute.js";
import { specs, swaggerUi } from "./src/config/swaggerConfig.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dbConfig();

app.get("/", (req, res) => {
  res.send("This is the prototype of the Back end of the websites which I will build and building!");
});

app.use("/api/authentication", AuthRoutes);
app.use("/api/bannercards", BannerCardsRoutes);
app.use("/api/general", GeneralInforRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/songs", SongRoutes);
app.use("/api/subscribers", SubscriberRoutes);
app.use("/api/visitors",VisitorRoutes);
app.use("/api/testimonies", TestimonyRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
