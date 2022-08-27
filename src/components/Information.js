import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { profileSlice } from '../redux/profileSlice'

const Information = () => {

  const dataHobits = ['Read book','Listen to music', 'Play football', 'Swimming']
  const [gender, setGender] = useState('Nam')
  const [dob, setDob] = useState('')
  const [hobits,setHobits] = useState([])
  const [img, setImg] = useState(null)
  const dispatch = useDispatch()


  const onChangeRadio = (e) => {
    setGender(e.target.value)
  }
  const onChangeDob = e => {
    setDob(e.target.value)
  }

  const onImageChange = (e) => {
    const [file] = e.target.files
    setImg(URL.createObjectURL(file))
  }

  const handleClick = () => {
    dispatch(profileSlice.actions.setValueHobits(hobits))
    dispatch(profileSlice.actions.setValueDob(dob))
    dispatch(profileSlice.actions.setValueGender(gender))
    dispatch(profileSlice.actions.setValueAvatar(img))
  }
  return (
        <div className='signup_form'>
          <h1>Your information</h1>
          <Form>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text>Avatar</InputGroup.Text>
                <Form.Control type='file' name='avatar' onChange={onImageChange}/>
              </InputGroup>
            </Form.Group>
            <img className={!!img ? '' : 'hideImg'} style={{ height: '120px', width: '200px', objectFit: 'contain'}} src={img} alt="" />
            <Form.Group className="mb-3" style={{display: 'flex'}}>
              <label className='me-3'>Giới tính</label>
              <Form.Check value='Nam' type='radio' defaultChecked label='Nam' name='gender' className='me-3' onChange={onChangeRadio}/>
              <Form.Check value='Nữ' type='radio' label='Nữ' name='gender' onChange={onChangeRadio}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text className='text_input'>Date of birth</InputGroup.Text>
                <Form.Control max='2022-01-01' name='dob' onKeyDown={(e) => e.preventDefault()} value={dob} onChange={onChangeDob} type='date' placeholder='dd/mm/YYYY'/>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup className='hobits'>
                <InputGroup.Text className='text_input'>Hobits</InputGroup.Text>
                <Multiselect
                  isObject={false}
                  options={dataHobits} // Options to display in the dropdown
                  onSelect={(l) => setHobits(l)} // Function will trigger on select event
                  onRemove={(l) => setHobits(l)} // Function will trigger on remove event
                  hidePlaceholder={true}	 // Property name to display in the dropdown options
                  placeholder = 'Choose...'
                />
              </InputGroup>
            </Form.Group>
            <Link to='/profile'>
              <Button onClick={handleClick} className='button_form' variant="primary" >
                Complete
              </Button>
            </Link>
          </Form>
        </div>
        
  )
}

export default Information