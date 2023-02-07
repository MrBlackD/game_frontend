import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import User from "./pages/user/User";
import Main from "./pages/main/Main";
import Admin from "./pages/Admin";
import Answer from "./pages/user/Answer";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/main" element={<Main/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/answer" element={<Answer/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);