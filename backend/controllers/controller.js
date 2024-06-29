const mysql=require('mysql')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Polo0909",
    database:"AirportManagement"

})

const home=(req,res)=>{

    try {
        res.send({msg:'hello home'});
    } catch (error) {
        console.log(error);
    }
}
const user=(req,res)=>{
    try {
        const sqlget='SELECT * from CLIENTS'
        db.query(sqlget,(err,result)=>{
            if(err) return res.json(err);
            return res.json(result);
        })
    } catch (error) {
        console.log(error);
    }
}
const signup=(req,res)=>{
    try {
        const sqlget='insert into CLIENTS (fname,mname,lname,phone,email,password) values(?,?,?,?,?,?);'

        console.log(req.body);
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

const login=(req,res)=>{
    try {
    const username=req.body.username;
    const password=req.body.password;
    db.query('select * from admin where username=? and password=?',[username,password],(err,result)=>{
        if(err)
        res.send({err: err})
        if(result.length>0)
        res.send(result);
        else
        {
            res.send({msg: 'Invalid Admin Login'})
        }
    })
    } catch (error) {
        console.log(error);
    }
}
const customerlogin=(req,res)=>{
    try {
        const username=req.body.email;
        const password=req.body.password;
        db.query('select * from CLIENTS where email=? and password=?',[username,password],(err,result)=>{
            if(err)
            res.send({err: err})
            if(result.length>0)
            res.send(result);
            else
            {
                res.send({msg: 'Invalid Customer Login'})
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const getcustomerlogin=(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        
        db.query('select client_id from CLIENTS where email=? and password=?',[email,password],(err,result)=>{
            if(err)
            res.send({err: err})
            if(result.length>0)
            res.send(result);
            else
            {
                res.send({msg: 'Invalid Customer Login'})
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const CustomerPanel=(req,res)=>{
    try {
        const {id}=req.params;
        const sqlGet="select fname from CLIENTS where client_id=?;"
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
const Getuser=(req,res)=>{
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
const getairports=(req,res)=>{
    try {
        const sqlGet="select * from Airport;"
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

const BookTicket=(req,res)=>{
    try {
        const departure=req.body.departure;
        const arrival=req.body.arrival;
        const departureDate=req.body.departureDate;
        const returnDate=req.body.returnDate;
        const classs=req.body.class;
        const price=req.body.price;
        const sqlInsert='insert into FlightBooking (departure,arrival,departureDate,returnDate,class,price) values (?,?,?,?,?,?)';
        db.query(sqlInsert,[departure,arrival,departureDate,returnDate,classs,price],(err,result)=>{
            if(err)
            res.send({err:err});
        })
    } catch (error) {
        console.log(error);
    }
}
const SearchFlights=(req,res)=>{
    try {
        const sqlGet="select fb_id,departure,arrival,departureDate, returnDate, class,price from FlightBooking;"
        db.query(sqlGet,(err,result)=>{
            // console.log(result);
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}

const AvailableFlights=(req,res)=>{
    try {
        // const departureDate=req.body.departureDate;
        // const returnDate=req.body.returnDate;
        // const fares=req.body.fares;
        const departureDate = '2024-03-25'; // Example: '2024-03-07%' (replace with actual value)
        const returnDate = '2024-03-25'; // Example: '2024-03-08%' (replace with actual value)
        const fares =5000; // Example: 100 (replace with actual value)
        // console.log(departureDate);
        // console.log(returnDate);
        // console.log(fares);

        const sqlGet="select f.flight_no,s.schedule_id,f.airplane_id,a.max_seats,s.departure_time, s.arrival_time, fs.status,f.fares from FLIGHT f inner join SCHEDULE s on s.schedule_id=f.schedule_id inner join FlightStatus fs on fs.flightStatus_id=f.flightStatus_id inner join AIRPLANE a on a.airplane_id=f.airplane_id where s.departure_time like  ? and s.arrival_time like ? and f.fares=?;"
        db.query(sqlGet,[departureDate+"%",returnDate+"%",fares],(err,result)=>{
            console.log(result);
            if(err)
            res.send({err: err});
            else
            res.send(result);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={home,user,signup,login,customerlogin,getcustomerlogin,CustomerPanel,Getuser,getairports,SearchFlights,BookTicket,AvailableFlights}