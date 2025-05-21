import { Container,Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { expire } from "../features/tokenSlice";

function Header({isLogin}) {
    const logo={padding:"5px",fontSize:"25px",margin:"5px"};

    let navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");                    
        dispatch(expire());
        navigate("/");
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid="xxl">
                <Navbar.Brand href="http://localhost:3000/">
                    <i class="fa-solid fa-cubes-stacked" style={logo}></i>
                    {" "} Todo Stacker
                </Navbar.Brand>
                {isLogin===false && <Button variant="light" style={{float:'right'}} onClick={logout}>Logout</Button>}
            </Container>
        </Navbar>
    );
}

export default Header;