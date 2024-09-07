const { GoogleGenerativeAI }= require("@google/generative-ai");
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser=require('body-parser');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello Gemini')
})

//const prompt = "Write a story about a magic backpack.";
const generate = async (prompt)=>{
    try{
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    
}catch(err){
    console.log(err);
    return 'Error generating content';
}
};

app.post('/api/content',async(req,res)=>{
    try{
        const data = req.body.message;//.
        const result = await generate(data);
        res.json({ response: result });
    }catch(err){
        res.send("error"+err)
    }
})
//generate();
const PORT =3000
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})