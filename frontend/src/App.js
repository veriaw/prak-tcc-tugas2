import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UpdateNote from './components/UpdateNote';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/notes" element={<NoteList/>}/>
        <Route path="/add" element={<AddNote/>}/>
        <Route path="/update" element={<UpdateNote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
