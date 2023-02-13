
import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion';
import { urlFor, client } from '../client';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice';


function Navbar() {
  const [users, setUsers] = useState([]);
  useEffect(() => {//called once whenthe site first loads
    const query = '*[_type == "profile"]'
    client.fetch(query)
      .then((data) => { setUsers(data); })
  }, [])

  const name = useSelector(state => state.user.name)
  const dispatch = useDispatch()
  // console.log("name is: " + name);
  

  let currentUser = users[0];

  var imgUrl;
  try {
    imgUrl =  urlFor(currentUser.img);
  } catch (error) {
  }
  // console.log(users);

  return (
    <div className="
    bg-blue-500 
    w-screen 
    h-14
    auto-cols-auto
    fixed
    flex 
    top-0
    justify-center items-center
    ">
      <div>
        <h1 onClick={() => dispatch(setUser("Elygh Thao"))} className='
        text-2xl
        font-bold
        h-fit
        w-fit
        '>Text A Message!</h1>
      </div>
      <div className='
      absolute
      top-1 right-2
      '>
        <motion.img
        whileInView={{}}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: .2, ease: 'easeInOut' }}
        src={imgUrl}
        alt=""
        className="rounded-full object-cover h-12 w-12"
      />
      </div>
    </div>
  );
}

export default Navbar;