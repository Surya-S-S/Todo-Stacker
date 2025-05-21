import { Form,FloatingLabel,Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const {REACT_APP_API_GATEWAY} = process.env;
const BASE_URL = `${REACT_APP_API_GATEWAY}/api/user`;

function Register() {
    let navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [validated,setValidated] = useState();
    const [showAlert,setShowAlert] = useState(false);
    const [alertMsg,setAlertMsg] = useState("");  
    const [variant,setVariant] = useState("");

    function handleSubmit(event) {
        const form = event.currentTarget;    
        if (form.checkValidity() === false) {            
            setValidated(true);    
            event.preventDefault();
            event.stopPropagation();            
            return;
        }
        const url = BASE_URL+"/register";
        const body = {userName:userName,password:password};
        axios.post(url,body)
            .then((response) => {
                setAlertMsg(response.data);
                setVariant("success");
                setShowAlert(true);
                window.setTimeout(()=>{
                    setShowAlert(false);
                    navigate("/");
                    window.location.reload(true);
                },2000);                
            })
            .catch((error) => {
                setAlertMsg(error.response.data.message);
                setVariant("danger");
                setShowAlert(true);
                window.setTimeout(()=>{setShowAlert(false)},2000);
            });
        event.preventDefault();
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Alert variant={variant} show={showAlert} onClose={()=>setShowAlert(false)}>{alertMsg}</Alert>
            {showAlert && <br/>}
            <FloatingLabel controlId="floatingInput" label="Username">                    
                <Form.Control required type="text" pattern="[A-Za-z0-9_].{3,}" onChange={(e)=>{setUserName(e.target.value)}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingPassword" label="Password">                    
                <Form.Control required type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e)=>{setPassword(e.target.value)}}/>
                <Form.Control.Feedback type="invalid">Must contain lowercase, uppercase, number.</Form.Control.Feedback>
            </FloatingLabel><br/>
            <Button type="submit" style={{width:'100%'}}>Register</Button>            
        </Form>
    );
}

export default Register;