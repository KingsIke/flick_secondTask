import express, {Request, Response, NextFunction} from "express"
import { connectDB } from "./config/db"
import dotenv from "dotenv"
import customersRoutes from "./routes/customersRoutes"
import bvnRoute from "./routes/bvnRoute"
import ninRoutes from "./routes/ninRoutes";
import phoneRoutes from "./routes/phoneRoutes";
import voterRoutes from "./routes/voterRoutes";
import crcRoute from "./routes/crcRoute"
import firstcentralRoutes from "./routes/firstcentralRoutes"
import creditpremiumRoutes from "./routes/creditpremiumRoutes"
import amlRoutes from "./routes/amlRoutes"
import cacRoutes from "./routes/cacRoutes"
import bankRoutes from "./routes/bankRoutes"
import driverRoutes from "./routes/driverRoutes"
import addressRoutes from "./routes/addressRoutes"
import ecosystemRoutes from "./routes/ecosystemRoutes"
import karmaRoutes from "./routes/karmaRoutes"
import radarphoneRoutes from "./routes/radarphoneRoutes"
import radarbvnRoutes from "./routes/radarbvnRoutes"
import basicphoneRoutes from "./routes/basicphoneRoutes"



dotenv.config()
const app = express()

const port  = 3000
connectDB()


app.use(express.json());
app.use('/api', customersRoutes)
app.use('/api', bvnRoute)
app.use('/api', ninRoutes)
app.use('/api', phoneRoutes)
app.use('/api', voterRoutes)
app.use('/api',crcRoute)
app.use('/api', firstcentralRoutes)
app.use('/api', creditpremiumRoutes)
app.use('/api', amlRoutes)
app.use('/api', cacRoutes)
app.use('/api', bankRoutes)
app.use('/api', driverRoutes)
app.use('/api', addressRoutes)
app.use('/api', ecosystemRoutes)
app.use('/api', karmaRoutes)
app.use('/api', radarphoneRoutes)
app.use('/api', radarbvnRoutes)
app.use('/api', basicphoneRoutes)
















const API_KEY = process.env.API_KEY
const Url =  process.env.URL



app.listen( port, ()=> {
    console.log(`server on port ${port}`)
})