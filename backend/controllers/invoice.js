const mysql=require('mysql')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Polo0909",
    database:"AirportManagement"

})

const UpdateFlightBooking=(req,res)=>{
    try {
        const id=req.body.id;

        const sqlUpdate="update FlightBooking set flight_no=(select f.flight_no from FLIGHT f inner join SCHEDULE s on s.schedule_id=f.schedule_id where s.schedule_id=?) where flight_no is null;"
        db.query(sqlUpdate,id,(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}

const getuserinfo=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select fname,lname from CLIENTS where client_id=?;"
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
const invoicefares=(req,res)=>{
    try {
        const sqlGet="select fb_id,departure,price from FlightBooking;"
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
const invoiceconfirm=(req,res)=>{
    try {
        const id=req.body.id;
        const departure=req.body.departure;
        console.log(id,departure);
        const sqlInsert="insert into Ticket (seat_no,departure_time,gate_no,airport_code) select t.nm,s.departure_time,a.gate_no,a.airport_code from SCHEDULE s, TempSeatGen t,Airport a where s.schedule_id=? and a.airport_name=? order by rand() limit 1;"
        db.query(sqlInsert,[id,departure],(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const invoiceconfirmAgain=(req,res)=>{
    try {
        const client_id=req.body.id;
        const flight_no=req.body.flight_no;
        const fares=req.body.fares;
        console.log(client_id,flight_no,fares);
        
        const sqlGet="update BOOKING set client_id=?,flight_no=?,fares=? where client_id is null and flight_no is null and fares is null;"
        db.query(sqlGet,[client_id,flight_no,fares],(err,result)=>{
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}

const removesearch=(req,res)=>{
    try {
        const sqlRemove='delete from FlightBooking';
        db.query(sqlRemove,(err,result)=>{
            if(err)
            res.send({err:err});
        })
    } catch (error) {
        console.log(error);
    }
}
const showPass=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select c.fname,c.lname,b.flight_no, t.seat_no,t.departure_time from BOOKING b inner join CLIENTS c on c.client_id=b.client_id  inner join Ticket t on t.ticket_id=b.ticket_id where c.client_id=?;"
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
module.exports={UpdateFlightBooking,getuserinfo,invoicefares,invoiceconfirm,invoiceconfirmAgain,removesearch,showPass}