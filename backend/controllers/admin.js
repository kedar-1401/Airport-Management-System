const mysql=require('mysql')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Polo0909",
    database:"AirportManagement"

})

const getstats=(req,res)=>{
    try {
        const sqlGet="select count(client_id) as countt,sum(fares) as summ from BOOKING;"
        db.query(sqlGet,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const get=(req,res)=>{
    try {
        const sqlGet="select * from CLIENTS;"
        db.query(sqlGet,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}

const getwithid=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select * from CLIENTS where client_id=?;"
        db.query(sqlGet,id,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const updateuser=(req,res)=>{
    try {
        const {id}=req.params;
        const {client_id,fname,mname,lname,phone,email}=req.body;
        const sqlUpdate="update CLIENTS set client_id=?,fname=?,mname=?,lname=?,phone=?,email=?where client_id=?";
        db.query(sqlUpdate,[client_id,fname,mname,lname,phone,email,id],(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const post=(req,res)=>{
    try {
        const sqlget='insert into CLIENTS (fname,mname,lname,phone,email,password) values(?,?,?,?,?,?);'

        const fname=req.body.fname;
        const mname=req.body.mname;
        const lname=req.body.lname;
        const phone=req.body.phone;
        const email=req.body.email;
        const password=req.body.password;
        db.query(sqlget,[fname,mname,lname,phone,email,password],(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const remove=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlRemove='delete from CLIENTS where client_id=?';
        db.query(sqlRemove,[id],(err,result)=>{
            if(err)
            res.send({err:err});
        })
    } catch (error) {
        console.log(error);
    }
}
const airplaneget=(req,res)=>{
    try {
        const sqlGet="select * from AIRPLANE;"
        db.query(sqlGet,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const airplanegetbyid=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select * from AIRPLANE where airplane_id=?;"
        db.query(sqlGet,id,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const sendairplanedata=(req,res)=>{
    try {
        const {airplane_id,max_seats}=req.body;
        const sqlInsert='insert into AIRPLANE values (?,?)';
        db.query(sqlInsert,[airplane_id,max_seats],(err,result)=>{
            if(err)
            res.send({err:err});
        })
    } catch (error) {
        console.log(error);
    }
}
const airplanegetdata=(req,res)=>{
    try {
        const {airplane_id,max_seats}=req.body;
        const sqlInsert='update AIRPLANE set max_seats=? where airplane_id=?';
        db.query(sqlInsert,[max_seats,airplane_id],(err,result)=>{
            if(err)
            res.send({err:err});
        })
    } catch (error) {
        console.log(error);
    }
}

const viewairplane=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select * from AIRPLANE where airplane_id=?;"
        db.query(sqlGet,id,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const getairports=(req,res)=>{
    try {
        const sqlGet="select * from Airport;"
        db.query(sqlGet,id,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports={getstats,get,updateuser,post,getwithid,remove,airplaneget,airplanegetbyid,sendairplanedata,airplanegetdata,viewairplane,getairports}