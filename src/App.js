import './App.css';
import {Route, Routes} from "react-router-dom"
import Register from "./components/register";
import Login from "./components/login";
import Main from "./components/main";
import Category from "./components/category";
import Account from "./components/account";
import Tool from "./components/tool";
import Reservation from "./components/reservation";

function App() {
    return (
        <Routes>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/" exact element={<Main/>}/>
            <Route path="/tools/category/:category" exact element={<Category/>}/>
            <Route path="/account" exact element={<Account/>}/>
            <Route path="/tool/get/:id" exact element={<Tool/>}/>
            <Route path="/tool/rent" exact element={<Reservation/>}/>
        </Routes>
    );
}

export default App;
