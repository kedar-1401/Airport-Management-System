const express =require('express');
const app=express();
const PORT=5000;
const cors=require('cors')
const mysql=require('mysql')
const router=require('./routes/route')

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/auth',router)

app.listen(PORT,() => {
    console.log(`Example app listening on http://localhost:${PORT}`)
  })