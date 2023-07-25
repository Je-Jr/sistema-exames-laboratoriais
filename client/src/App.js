import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Pacientes from './pages/Pacientes';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import EditarPaciente from './pages/EditarPaciente';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route element={<Profile/>} path='/profile'/>
        <Route element={<Pacientes/>} path='/pacientes'/>
        <Route element={<Cadastro/>} path='/pacientes/cadastro'/>
        <Route element={<EditarPaciente />} path='/pacientes/editar/:id'/>
      </Route>
      <Route element={<Home/>} path='/'/>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Register/>} path='/register'/>
    </Routes>
  );
}

export default App;
