import React from 'react'
import { useState } from 'react';

const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrdata]=useState("")
    const [qrSize,setQrsize]=useState("")
async function generateQR(){
setLoading(true);
try{
const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
setImg(url);
}catch(error){
console.error("Error generating QR generator: "+ error)
}finally{
    setLoading(false);
}
}
function downloadQR(){
fetch(img).then((response)=>response.blob())
.then((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}).catch((error)=>{console.log("error during download")})
}


  return (
    <div className="app-container">

        <h1>QR CODE <span>Generator</span></h1>

        {loading && <p>Please wait...</p>}
            {img && <img src={img} className='qr-image' />}
            <label htmlFor='dataInput' className='input-label' >
                Data for QR code: 
            </label>
            <input type='text' value={qrData} onChange={(e)=>setQrdata(e.target.value)} id='dataInput' placeholder='enter data for QR code'></input>
            <label htmlFor='sizeInput' className='input-label'>
                image size (eg., 150):
            </label>
            <input type='text' value={qrSize} onChange={(e)=>setQrsize(e.target.value)} id='sizeInput' placeholder='enter image size'></input>
            <button className='Generate-btn' onClick={generateQR} disabled={loading}>Generate</button>
            <button className='Download-btn' onClick={downloadQR}>Download QR code</button>
       <p>Designed By Kavirasu</p>
      
    </div>
  )
}

export default QrCode
