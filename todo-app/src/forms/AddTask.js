import { Form,FloatingLabel,Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { update } from "../features/updaterSlice";
import { expire } from "../features/tokenSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const {REACT_APP_API_GATEWAY} = process.env;
const BASE_URL = `${REACT_APP_API_GATEWAY}/api/task`;

function AddTask() {
    const floatRight={float:'right'};
    const [showAlert,setShowAlert] = useState(false);
    const [alertMsg,setAlertMsg] = useState("");
    
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [title,setTitle] = useState("");
    const [descrip,setDescrip] = useState("");
    const [status,setStatus] = useState("TODO");

    let navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(event) {
        const url = BASE_URL+"/addTask";
        const body = {userId:userId,title:title,descrip:descrip,status:status};
        const auth = {"Authorization":`Bearer ${token}`};
        axios.post(url,body,{headers:auth})
            .then((response) => {
                setAlertMsg(response.data);
                setShowAlert(true);
                dispatch(update());
                window.setTimeout(()=>{setShowAlert(false)},2000);
            })
            .catch((error) => {
                console.log(error.response.data);
                if(error.response.data.status===401) {
                    localStorage.removeItem("userId");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("token");                    
                    dispatch(expire());
                    navigate("/");
                }
            });
        event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Task Title">                    
                <Form.Control type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingTextarea" label="Task Description">
                <Form.Control as="textarea" onChange={(e)=>{setDescrip(e.target.value)}} style={{height:'80px'}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingSelect" label="Task Status">
                <Form.Select onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </Form.Select>
            </FloatingLabel><br/>
            <Button type="submit" style={floatRight}>Add</Button>
            <Alert variant="success" show={showAlert} onClose={()=>setShowAlert(false)}>{alertMsg}</Alert>                    
        </Form>
    );
}

export default AddTask;