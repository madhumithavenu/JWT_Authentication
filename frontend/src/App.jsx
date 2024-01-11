import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Welcome from './components/Welcome.jsx';

function App() {
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/user' element={<Welcome/>}/>
      </Routes>
    </main>
    </>
  );
}

export default App;
