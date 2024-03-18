import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import Users from "./components/Users";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Users/>}></Route>
        <Route path='/createUser' element={<CreateUser/>}></Route>
        <Route path='/updateUser/:id' element={<UpdateUser/>}></Route>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
