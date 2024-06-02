import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './Components/LoginForm';
import CreateUserForm from './Components/CreateUserForm';
import Message from './Components/Message/Message';



function App() {
  return (
  <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path='/createuser' element={<CreateUserForm/>} />
        <Route path='/Message' element={<Message/>} />
       

      </Routes>
    </BrowserRouter>
    
  </>
  );
}

export default App;
