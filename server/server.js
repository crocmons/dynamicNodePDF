const express = require('express');
const cors = require('cors');
const pdf = require('html-pdf')
const bodyParser = require('body-parser');

const pdfTemplate = require('./documents')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/create-pdf',(req,res)=>{

    pdf.create(pdfTemplate(req.body),{}).toFile('created.pdf', (err)=>{
      if(err){
         res.send(Promise.reject())
      }
    
      res.send(Promise.resolve())
})
})

app.get('/get-pdf',(req,res)=>{
     res.sendFile(`${__dirname}/created.pdf`)
   });

app.listen(port,()=>{
    console.log('Server started!')
})   
