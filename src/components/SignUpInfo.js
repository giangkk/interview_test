import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useRef, useState } from 'react'
import { profileSlice } from '../redux/profileSlice'
import { useDispatch } from 'react-redux'


const SignUpInfo = ({handleShow}) => {
  const [info, setInfo] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    cfPassword: ''
  })
  const {fullname, email,phone,password, cfPassword} = info

  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const target = useRef(null);
  const dispatch = useDispatch()

  const handleShowPassword = (e) => {
    if (e.target.classList.contains('confirm')) {
      setShowConfirmPassword(!showConfirmPassword)
    }
    else setShowPassword(!showPassword)
  }
  
  const handleFocus = (e) => {
    const {name} = e.target
    if (name === 'password' || name === 'cfPassword') {
      setShowTooltip(true)
    }
    setErr({
      ...errs,
      [name]: null
    })
  }
  
  const handleBlur = () => {
    setShowTooltip(false)
  }
  
  
  const handleInput = (e) => {
    const {name, value} = e.target
    setInfo({
      ...info,
      [name]: value
    })

    if ( !!errs[name] ) setErr({
      ...errs,
      [name]: null
    })
  }


  const checkValid = () => {
    const error = {}
    const reFullname = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/
    const reEmail = /\S+@\S+\.\S+/
    const rePhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    const rePassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (fullname === '') {
      error.fullname = 'cannot be blank!'
    } else if (!reFullname.test(fullname)) {
      error.fullname = 'only letters'
    }
    if (email === '') {
      error.email = 'cannot be blank!'
    } else if (!reEmail.test(email)) {
      error.email = 'incorrect format of email'
    }

    if (phone === '') {
      error.phone = 'cannot be blank!'
    } else if (!rePhone.test(phone)) {
      error.phone = 'incorrect format of phone number'
    }
    if (password === '') {
      error.password = 'cannot be blank!'
    } else if (! rePassword.test(password)) {
      error.password = 'please follow format below'
    }
    if (cfPassword === '') {
      error.cfPassword = 'cannot be blank!'
    } else if (cfPassword !== password) {
      error.cfPassword = 'not match'
    }

    return error
  }

  const [errs,setErr] = useState({})

  const handleNext = () => {
    const err = checkValid()
    if (Object.keys(err).length > 0) {
      setErr(err)
    } else {
      dispatch(profileSlice.actions.setValueEmail(info))
      dispatch(profileSlice.actions.setValuePhone(info))
      dispatch(profileSlice.actions.setValueName(info))
      handleShow(2)
    }
  }
  return (
    <div className='signup_form'>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control name='fullname' value={fullname} type='text' placeholder='Fullname *' isInvalid={ !!errs.fullname } onChange={handleInput} onFocus={handleFocus}/>
          <Form.Control.Feedback type='invalid'>
            { errs.fullname }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control name='email' value={email} type='email' placeholder='Your email address *' isInvalid={ !!errs.email } onChange={handleInput} onFocus={handleFocus}/>
          <Form.Control.Feedback type='invalid'>
            { errs.email }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control name='phone' value={phone} type='text' placeholder='Your phone number *' isInvalid={ !!errs.phone} onChange={handleInput} onFocus={handleFocus}/>
          <Form.Control.Feedback type='invalid'>
            { errs.phone }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <InputGroup className = 'input_group'>
            <Form.Control isInvalid={ !!errs.password } name='password' value={password} className='input_pw' onBlur={handleBlur} onFocus={handleFocus} ref={target} style={{width: '80%'}} type={ showPassword ? 'password' : 'text'} placeholder='Your password *' onChange={handleInput} />
            <div className='icon' onClick={handleShowPassword}>
              {showPassword ? <i className="ieye far fa-eye-slash " ></i> : <i className=" ieye far fa-eye " ></i>}
            </div>
            <Form.Control.Feedback type='invalid'>
              { errs.password }
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-2">
          <InputGroup className = 'input_group'>
            <Form.Control isInvalid={ !!errs.cfPassword } name='cfPassword' value={cfPassword} className='input_pw' onBlur={handleBlur} onFocus={handleFocus} type={ showConfirmPassword ? 'password' : 'text'} placeholder='Confirm password *' onChange={handleInput} />
            <div className='icon' onClick={handleShowPassword}>
              {showConfirmPassword ? <i className="ieye far fa-eye-slash confirm" ></i> : <i className=" ieye far fa-eye confirm" ></i>}
            </div>
            <Form.Control.Feedback type='invalid'>
              { errs.cfPassword }
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button className='button_form' onClick={handleNext} variant="primary">
          Next {'>'}
        </Button>
      </Form>
      <div style={showTooltip ? {opacity: 1} : {opacity: 0}} className='template'>
        <div>*8 or more characters</div>
        <div>*Upper and lowercase letters</div>
        <div>*At least one number</div>
        <div>*At least one special character</div>
      </div>
    </div>
  )
}

export default SignUpInfo