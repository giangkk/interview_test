import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { profileSlice } from '../redux/profileSlice'


const Address = ({handleShow}) => {

  const dataCity = [
    {id: '1', name:'Ha Noi'},
    {id: '2', name:'Bac Ninh'}
  ]
  const dataDistrict = [
    {id: '1', subId: '11', name:'Hai Ba Trung'},
    {id: '1', subId: '12', name:'Long Bien'},
    {id: '2', subId: '21', name:'Thuan Thanh'},
    {id: '2', subId: '22', name:'Gia Binh'},
  ]
  const dataWard = [
    {subId: '11', ssId: '111', name: 'Bach Khoa'},
    {subId: '11', ssId: '112', name: 'Bach Mai'},
    {subId: '12', ssId: '121', name: 'Thach Ban'},
    {subId: '12', ssId: '122', name: 'Sai Dong'},
    {subId: '21', ssId: '211', name: 'Song Ho'},
    {subId: '21', ssId: '212', name: 'Hoai Thuong'},
    {subId: '22', ssId: '221', name: 'Dong Cuu'},
    {subId: '22', ssId: '222', name: 'Ngam Luong'},
  ]
  // const data = [
  //   {'Hà Nội' : [
  //     {'Hai Ba Trung': ['Bach Khoa', 'Bach Mai']},
  //     {'Long Bien': ['Thach Ban', 'Sai Dong']}
  //   ]},
  //   {'Bắc Ninh': [
  //     {'Thuan Thanh': ['Song Ho', 'Hoai Thuong']},
  //     {'Gia Binh': ['Dong Cuu', 'Ngam Luong']}
  //   ]}
  // ]

  const dispatch = useDispatch()

  const [address, setAddress] = useState({
    city: '',
    district: '',
    ward: '',
    street: ''
  })
  const {city, district, ward, street} = address
  const [errs,setErr] = useState({})

  const checkValid = () => {
    const error = {}
    if (city === '') {
      error.city = 'please choose!'
    }
    if (district === '') {
      error.district = 'please choose!'
    } 

    if (ward === '') {
      error.ward = 'please choose!'
    } 
    if (street === '') {
      error.street = 'please type detail address'
    } 

    return error
  }

  const handleNext = () => {
    const err = checkValid()
    if (Object.keys(err).length > 0) {
      setErr(err)
      return
    }

    const c = dataCity.find(c => c.id === city)
    const d = dataDistrict.find(d => d.subId === district)
    const w = dataWard.find(w => w.ssId === ward)

    const address = {
      city: c.name,
      district: d.name,
      ward: w.name,
      street
    }
    dispatch(profileSlice.actions.setValueCity(address))
    dispatch(profileSlice.actions.setValueDistrict(address))
    dispatch(profileSlice.actions.setValueWard(address))
    dispatch(profileSlice.actions.setValueStreet(address))
    handleShow(3)
  }
  const handleSkip = () => {
    handleShow(3)
  }

  const handleSelect = (e) => {
    const {name, value} = e.target
    setAddress({
      ...address,
      [name]: value
    })
    setErr({
      ...errs,
      [name] : null
    })
  }
  
  
  return (
        <div className='signup_form'>
          <h1>Your address</h1>
          <Form>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text className='text_input'>Province/City</InputGroup.Text>
                <Form.Select isInvalid={ !!errs.city } name='city' value={city} onChange={handleSelect}>
                  <option hidden>Choose...</option>
                  {dataCity.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  { errs.city }
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text className='text_input'>District</InputGroup.Text>
                <Form.Select isInvalid={ !!errs.district } name='district' value={district} onChange={handleSelect}>
                  <option hidden>Choose...</option>
                  {dataDistrict.filter( d => d.id === city )
                                .map(d => <option key={d.subId} value={d.subId}>{d.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  { errs.district }
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup>
                <InputGroup.Text className='text_input'>Ward</InputGroup.Text>
                <Form.Select isInvalid={ !!errs.ward } name='ward' value={ward} onChange={handleSelect}>
                  <option hidden>Choose...</option>
                  {dataWard.filter( w => w.subId === district )
                            .map( w => <option key={w.ssId} value={w.ssId}>{w.name}</option> )}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  { errs.ward }
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control isInvalid={ !!errs.street } name='street' type='text' value={street} placeholder='Street ...' onChange={handleSelect} />
              <Form.Control.Feedback type='invalid'>
                { errs.street }
              </Form.Control.Feedback>
            </Form.Group>
            <ButtonGroup style={{width: '100%'}}>
              <Button style={{ borderRadius: '15px' ,flex: 3, marginRight: '50px'}} variant="primary" onClick={handleNext}>
                Next {'>'}
              </Button>
              
              <Button style={{borderRadius: '15px', flex: 1}} variant="primary" onClick={handleSkip}>
                Skip
              </Button>
            </ButtonGroup>
          </Form>
        </div>
        
  )
}

export default Address