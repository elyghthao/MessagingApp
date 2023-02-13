import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { client, urlFor } from '../client';
import pikachu from '../assets/pikachu.png'


function Main() {
  const [message, setMessage] = useState([]);
  const [reload, setReload] = useState(0);
  let size = 0;
  useEffect(() => {//called once whenthe site first loads
    const query = '*[_type == "message"]'
    client.fetch(query).then((data) => { 
      size = data.length;
      // console.log("size is: " + size);
      setMessage(data);
    }
    )
  }, [])

  useEffect(()=>{
    setInterval(()=>{
      const query = '*[_type == "message"]'
      client.fetch(query).then((data) => { 
        // console.log(data);
        // console.log("current size is: " + size)
        if(size != data.length){
          // console.log("change!");
          size = data.length;
          setMessage(data);
        }})
    }, 2000)
  }, [])




    

  message.sort(function(a, b) {
    var keyA = new Date(a._createdAt),
      keyB = new Date(b._createdAt);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });


  // message.sort();
  // console.log(message);
  return (
    <div className="
    bg-stone-200
      w-screen
      block">
      {/* <h1 className=''>Main</h1> */}
      <div className='bg-stone-200 p-5 w-full'></div>


      <div>
        {message.map((msg, index) => (
          <div className='pt-5 px-10 rounded-1/8 bg-stone-200' key={index}>
            <div className='
              bg-green-400
              rounded-full
              flex 
              justify-center items-center
              '>
              <h1 className='text-2xl font-medium'>{msg.content}</h1>
            </div>

            <div className='flex justify-center items-center'>
               {msg.img && 
               <img src={urlFor(msg.img)} alt={msg.timestamp} className=
               {`object-cover w-1/4 p-1 ${(index === message.length-1) ? 'pt-1 pb-14': ''}`} />
               }
            </div>

            
            {/* <img src={pikachu} alt={msg.timestamp} className=
               {`object-scale-down h-48 w-96`} /> */}
            

          </div>
        ))}
      </div>


    </div>
  );
}

export default Main;