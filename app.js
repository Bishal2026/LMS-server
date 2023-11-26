import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(cookieParser());

app.use("/ping",function(req,res){
    res.send("/pong");
})

app.use("*",(req,res)=>{
    res.status(404).send('OOPS!! 404 page is not found');
})

export default app;

