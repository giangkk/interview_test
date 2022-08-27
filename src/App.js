import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
function App() {
  return (
    <Routes>
      <Route path='/' element={ <SignUp /> } />
      <Route path='/profile' element={ <Profile /> } />
    </Routes>
  );
}

export default App;
