import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UpdateNote from './components/UpdateNote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList/>}/>
        <Route path="/add" element={<AddNote/>}/>
        <Route path="/update" element={<UpdateNote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
