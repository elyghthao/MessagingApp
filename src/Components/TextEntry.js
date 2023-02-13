
// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion';
// import { urlFor, client } from '../client';
import React,{ useState } from "react";
import { client, urlFor } from '../client';
import { Button } from 'react-bootstrap'
import { motion } from 'framer-motion'


function TextEntry() {
  const inputRef = React.useRef(null);


  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      // console.log("Message: " + event.target.value);
      // console.log(selectedFile);
      createDoc();
      event.target.value = "";

      // client.delete({query: '*[_type == "message" && _id == "Pfyhvf2287QNe3dmP9z5Ot"][0...999]'})

    }
  };

  const createDoc = () => {
    let documentId = '';
    let imageId = '';

    const doc = {
      _type: 'message',
      content: msg,
      profile: "Elygh Thao",
    }
    client.create(doc).then((res) => {
      documentId = res._id;
      console.log("documentId: " + documentId);
      // console.log(`Bike was created, document ID is ${res._id}`)
      if (selectedFile !== "") {
        client.assets.upload('image', selectedFile, { contentType: 'image', filename: 'someText.png' })
          .then((document) => {
            imageId = document._id;
            console.log("imageId:" + imageId);
            // console.log('The image was uploaded!', document)

            client.patch(documentId)
              .set({
                img: {
                  _type: "image",
                  asset: {
                    _ref: imageId,
                    _type: "reference"
                  }
                }
              }).commit().then((updatedBike) => {
                console.log("updated change")
              })

          })
      }



    })
    setMsg("");
    setSelectedFile("");
    setPreview("");
  }

  const onButtonClick = (e) => {
    // console.log("button click");
    // console.log(inputRef.current.value);
    inputRef.current.value = "";
    if(msg !== "" || selectedFile !== ""){
      createDoc();
    }
  }

  return (
    <div className="
      bg-blue-500 
      w-screen 
      h-10
      auto-cols-auto
      fixed
      flex
      flex-row
      bottom-0
      ">
      <div className="
        
        w-3/4
        flex
        p-1
        ">
        <input type="text"
          id="message"
          onKeyDown={handleKeyDown}
          className="w-screen"
          ref={inputRef}
          onChange={(e) => {
            setMsg(e.target.value);
          }} />
      </div>

      <div className="
        flex
        justify-left
        w-1/4
        align-middle">
        <input type="file"
          className="opacity-0 -z-3 fixed w-8"
          
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }} />
        <img src={preview} alt=" " className="
            w-8"/>

        <motion.div
        whileTap={{ scale: 1.1 }}
        className="
        mt-2
        w-1/2
        ">
          <Button className="
        bg-slate-600
        text-white
        rounded-lg
        h-fit
        w-full
        "
            onClick={onButtonClick}>
            Submit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default TextEntry;