import { Form,FloatingLabel,Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState,useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initialize } from "../features/tokenSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const {REACT_APP_API_GATEWAY} = process.env;
const BASE_URL = `${REACT_APP_API_GATEWAY}/api/user`;

function Login() {
    let navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [showAlert,setShowAlert] = useState(false);
    const [alertMsg,setAlertMsg] = useState("");
    const [variant,setVariant] = useState("");
    const dispatch = useDispatch();
    const isExpired = useSelector((state) => state.token.isExpired);    

    useEffect(()=>{
        if(isExpired===true) {
            setAlertMsg("Token Expired");
            setVariant("info");
            setShowAlert(true);            
            window.setTimeout(()=>{setShowAlert(false)},2000);
            dispatch(initialize());
        }
        // eslint-disable-next-line
    },[isExpired]);

    function handleSubmit(event) {
        const url = BASE_URL+"/login";
        const body = {userName:userName,password:password};
        axios.post(url,body)
            .then((response) => {
                localStorage.setItem("userId",response.data.userId);
                localStorage.setItem("userName",response.data.userName);
                localStorage.setItem("token",response.data.token);
                navigate("/home");
            })
            .catch((error) => {
                console.log(error.response.data);
                setAlertMsg(error.response.data.message);
                setVariant("danger");
                setShowAlert(true);
                window.setTimeout(()=>{setShowAlert(false)},2000);
            });
        event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Alert variant={variant} show={showAlert} style={{textAlign:'center'}} onClose={()=>setShowAlert(false)}>{alertMsg}</Alert>
            {showAlert && <br/>}
            <FloatingLabel controlId="floatingInput" label="Username">               
                <Form.Control type="text" onChange={(e)=>{setUserName(e.target.value)}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingPassword" label="Password">                    
                <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </FloatingLabel><br/>
            <Button type="submit" style={{width:'100%'}}>Login</Button>            
        </Form>
    );
}

export default Login;