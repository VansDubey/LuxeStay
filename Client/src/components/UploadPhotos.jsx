import React from 'react'
import { useState } from 'react'
import { MdDownloading } from "react-icons/md";
import axios from 'axios'


const UploadPhotos = () => {

    const [ link, setlink] = useState('')
    const [AddedPhotos, setAddedPhotos] = useState([])
    const [image, setimage] = useState([])

    function addPhotoByLink(ev){
        ev.preventDefault();
        const promise = axios.post('http://localhost:3000/upload-by-link',{link:link})
        promise.then(res=>{
            const data = res.data;
            console.log({data});
          }
        )
      
        setAddedPhotos(prev=>{
          return [...prev,link]
        })
       setlink('')
       }
    
       async function uploadPhoto(ev){
        ev.preventDefault();
        const file = ev.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        console.log(...formData);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          
        });
        const url = response.data.imageurl;
        setimage(prev=>{
          return[...prev,url];
        });
       
      } catch (error) {
        console.error(error);
        // Handle upload errors
      }
    }
  return (
    <div>

           <h1 className="text-2xl ">Photos</h1>
          <input className=" border-2  p-1 rounded-sm w-1/2" type="text" placeholder ="Add Photo via link..." value={link} onChange={ev=>setlink(ev.target.value)}/>
          <button onClick = {addPhotoByLink} className="bg-pink-600 p-2 rounded-2xl w-1/4"> Add Photo </button>

            <div className="flex gap-2">
            {AddedPhotos.map(link => (
              <div>
                 <img src={link} alt="Added photo" style={{
                       borderRadius: '10px',
                         width: '12vw',
                         height: '7vw',
                        }} />
                  </div>
                ))}

                
        {image.map(item => (
   <div key={item}>
     <img src={item} alt="Uploaded" style={{ width: "12vw", height: "7vw", borderRadius: "10px" }} />
   </div>
))}


                <label className="h-[7vw] w-[10vw] border-black border-2 rounded-md flex items-center justify-center">
                <input type="file" className="hidden" onChange={uploadPhoto}/>
                  <MdDownloading size="2vw"/>
                
                     </label>
                     
                 


                 </div>



    </div>
  )
}

export default UploadPhotos