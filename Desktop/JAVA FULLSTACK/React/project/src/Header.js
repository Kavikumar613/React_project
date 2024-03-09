
import React, { useContext } from 'react'
import {FaLaptop, FaMobileAlt} from 'react-icons/fa'
import Datacontext from './Context/Datacontext'

const Header = ({title}) => {
  let {width}=useContext(Datacontext)
  return (
    <div className='Header'>
        <h1>{title}</h1>
        {width<770?<FaMobileAlt/>:<FaLaptop/>}
    </div>
  )
}

export default Header