const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const cors=require('cors')
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/GMAIL')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>console.log(err))
const mailSchema = mongoose.Schema({
    mail:{
        type: String,
        requiresd: true
    },
    pass:{
        type: String,
        required: true
    }
})

const Mail= mongoose.model('mailDetails',mailSchema)

app.post('/signup', async(req,res)=>{
    const {mail,password}=req.body
    if(!mail) return res.status(400).json({msg:"Mail not found"})
    if(!password) return res.status(400).json({msg:"Password not found"})
    const newUser= await Mail.create({mail:mail,pass:password})
    return res.status(200).json({msg:"Signedup sucessfully"})
})


app.post('/login',async(req,res)=>{
    const {mail,password}=req.body
    if(!mail) return res.status(400).json({msg:"Mail not found"})
    if(!password) return res.status(400).json({msg:"Password not found"})
    const user=await Mail.findOne({mail:mail})
    if(!user) return res.status(400).json({msg:"Please signup"})
    if(user.pass!==password) return res.status(400).json({msg:"Invalid Password"})
    return res.status(200).json({msg:"Logged in sucessfully"})
})




app.listen(port,()=>console.log('server is listening'))