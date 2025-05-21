import { Form,FloatingLabel,Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from 'react-redux';
import { update } from "../features/updaterSlice";
import { expire } from "../features/tokenSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const {REACT_APP_API_GATEWAY} = process.env;
const BASE_URL = `${REACT_APP_API_GATEWAY}/api/task`;

function UpdateTask(props) {    
    const floatRight={float:'right'};
    const [showAlert,setShowAlert] = useState(false);
    const [alertMsg,setAlertMsg] = useState("");
    
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [title,setTitle] = useState("");
    const [descrip,setDescrip] = useState("");
    const [status,setStatus] = useState("");

    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const url = BASE_URL+"/getTaskById/"+userId+"/"+props.taskId;
        const auth = {"Authorization":`Bearer ${token}`};
        axios.get(url,{headers:auth})
            .then((response) => {
                setTitle(response.data.title);
                setDescrip(response.data.descrip);
                setStatus(response.data.status);
                setAlertMsg("Details retrieved");
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
                setAlertMsg(error.response.data);
                setShowAlert(true);
                window.setTimeout(()=>{setShowAlert(false)},2000);
            });
            // eslint-disable-next-line
    },[]);

    function handleSubmit(event) {
        const url = BASE_URL+"/updateTask/"+userId+"/"+props.taskId;
        const body = {title:title,descrip:descrip,status:status};
        const auth = {"Authorization":`Bearer ${token}`};
        axios.put(url,body,{headers:auth})
            .then((response) => {
                setAlertMsg(response.data);
                setShowAlert(true);
                window.setTimeout(()=>{setShowAlert(false);},2000);  
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
                <Form.Control type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingTextarea" label="Task Description">
                <Form.Control as="textarea" value={descrip} onChange={(e)=>{setDescrip(e.target.value)}} style={{height:'80px'}}/>
            </FloatingLabel><br/>
            <FloatingLabel controlId="floatingSelect" label="Task Status">
                <Form.Select value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </Form.Select>
            </FloatingLabel><br/>
            <Button type="submit" style={floatRight}>Update</Button>
            <Alert variant="success" show={showAlert} onClose={()=>setShowAlert(false)}>{alertMsg}</Alert>
        </Form>
    );
}

export default UpdateTask;