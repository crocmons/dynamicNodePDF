import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from "file-saver"

function App() {
  const [values, setValues] = useState({
    name: '',
    receiptId:0,
    price1:0,
    price2:0,
  })

  const handleChange = ({ target: { value, name } })=>{
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const downloadPdf = ()=>{
    axios.post('/create-pdf',values)
      .then(()=>{
        axios.get('/get-pdf',{responseType: 'blob'})
        .then((result)=>{
          const pdfBlob = new Blob([result.data], {type:'application/pdf'})
          saveAs(pdfBlob, 'receipt.pdf')
        })

      })
  }

  return (
    <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
        <input type="number" placeholder="Price1" name="price1" onChange={handleChange} />
        <input type="number" placeholder="Price2" name="price2" onChange={handleChange} />
        <button onClick={downloadPdf}>
          Download PDF
        </button>
    </div>
  );
}

export default App;
