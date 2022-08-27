import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { useSelector } from 'react-redux';



const Profile = () => {
  const avatar = useSelector(state => state.profile.avatar)
  const fullname = useSelector(state => state.profile.fullname)
  const email = useSelector(state => state.profile.email)
  const dob = useSelector(state => state.profile.dob)
  const phone = useSelector(state => state.profile.phone)
  const gender = useSelector(state => state.profile.gender)
  const street = useSelector(state => state.profile.street)
  const ward = useSelector(state => state.profile.ward)
  const district = useSelector(state => state.profile.district)
  const city = useSelector(state => state.profile.city)
  const hobits = useSelector(state => state.profile.hobits)
  

  const age = !!dob ? 2022 - parseInt(dob.split('-')[0]) : null
  const hobbies = hobits.join()
  return (
    <div className="container wrapper_profile">
      <div className="info">
        <div className="basis">
          <div className="basis_img">
            {
              !!avatar
              ? <Image style={{ height: '120px', width: '200px', objectFit: 'contain'}} src={avatar}/>
              : <Image style={{ height: '120px', width: '200px', objectFit: 'contain'}} src={defaultAvatar}/>
            }
          </div>
          <div className='basis_data'>
            <p>Hi, {fullname}</p>
            <p>{email}</p>
            <p>Age: {age}</p>
          </div>
        </div>
        <div className="details">
          <p>Phone: {phone}</p>
          <p>Gender: {gender}</p>
          {street ? <p>Address: {street} , {ward} , {district}, {city}</p> : <p>Address: </p>}
          <p>Hobits: {hobbies}</p>
        </div>
      </div>
      <ButtonGroup style={{width: '40%'}}>
        <Button style={{ borderRadius: '15px' ,flex: 1, marginRight: '50px'}} variant="primary" type="submit">
          Change password
        </Button>
        
        <Button style={{borderRadius: '15px', flex: 1}} variant="primary" type="submit">
          Homepage
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Profile