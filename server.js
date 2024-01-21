

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors()) 
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notes'
})

app.post('/notes', (req, res)=>{
    const sql = "INSERT INTO login ('email', 'password') Values (?)";
    const values = [req.body.email, req.body.password]
    db.query(sql, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/',(req, res)=>{
    return res.json("From Backend server")
})

//app.get('/notes', (req, res)=>{
//    const sql = 'SELECT * FROM users';
//    db.query(sql, (err, data)=>{
//        if(err) return res.json(err);
//        return res.json(data)
//    })
//})

app.listen(8081, ()=>{
    console.log('Listening..')
})
