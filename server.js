import app from "./app.js";
import  {config} from 'dotenv';
import conncetionToDB from "./config/dbConnection.js";


config();

const PORT = process.env.PORT || 5000;

app.listen(PORT ,async()=>{
     await conncetionToDB()
    console.log(`server is runnning ${PORT}`);
})