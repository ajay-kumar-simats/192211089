const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Result = require('./models/Result');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB Connected")).catch((err)=>console.error("Mongo Error",err));

app.post('/average',async(req,res)=>{
    const {numbers} = req.body;
    if(!Array.isArray(numbers)||numbers.length===0){
        return res.status(400).json({error: 'Provide a non-empty array of numbers'});

    }

    let total = 0;
    for(let i = 0;i < numbers.length;i++){
        if(typeof numbers[i] !== 'number') return res.status(400).json({error:'All must be numbers'});
        total += numbers[i];
    }

    const average = total/numbers.length;

    try{
        const newResult = new Result({numbers,average});
        await newResult.save();
        res.json({average});
    }catch(err){
        res.status(500).json({error:'Error saving result'});
    }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log('Server running on port ${PORT}'));
