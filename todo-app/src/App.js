import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import Login from "./forms/Login";
import Register from "./forms/Register";
import HomePage from "./pages/HomePage";
import AllTasks from "./taskLists/AllTasks";
import TodoTasks from "./taskLists/TodoTasks";
import DoingTasks from "./taskLists/DoingTasks";
import DoneTasks from "./taskLists/DoneTasks";

function App() {
  return (
    <div className="container-xxxl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}>
            <Route index element={<Login/>}/>
            <Route path="Register" element={<Register/>}/>
          </Route>
          <Route path="/home" element={<HomePage/>}> 
            <Route index element={<AllTasks/>}/>
            <Route path="TodoTasks" element={<TodoTasks/>}/>
            <Route path="DoingTasks" element={<DoingTasks/>}/>
            <Route path="DoneTasks" element={<DoneTasks/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
