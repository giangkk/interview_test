import Image from 'react-bootstrap/Image'

import SignUpInfo from './SignUpInfo'
import Address from './Address'
import Information from './Information'

import logo from '../assets/images/eiffel.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
const SignUp = () => {

  const [show, setShow] = useState(1)
  const handleShow = (num) => {
    setShow(num)
  }
  return (
    <div className='fluid-container wrapper'>
      <div className="logo">
        <Image src={logo} className='logo_img' />
      </div>
      <div className='main'>
        {show === 1 ? <SignUpInfo handleShow={handleShow}/> : show === 2 ? <Address handleShow={handleShow}/> : <Information />}
        <div className='policy'>
          <p>By continuing you agree with out <Link to='#'>Terms of Service</Link> and <Link to='#'>Privacy Policy</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp