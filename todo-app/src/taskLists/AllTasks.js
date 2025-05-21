import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Container,Dropdown,DropdownButton,Modal,Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update } from "../features/updaterSlice";
import { expire } from "../features/tokenSlice";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateTask from '../forms/UpdateTask';
import axios from "axios";

const {REACT_APP_API_GATEWAY} = process.env;
const BASE_URL = `${REACT_APP_API_GATEWAY}/api/task`;

function AllTasks() {
    const card={marginBottom:'5px',fontSize:'15px'};
    const floatRight={float:'right'};    

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [tasks,setTasks] = useState([]);
    const [currTaskId,setCurrTaskId] = useState("");
    const [updateTask,setUpdateTask] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const isEmpty = (tasks.length===0);
    const [isLoading,setIsLoading] = useState(true);
    const isUpdated = useSelector((state) => state.updater.isUpdated);

    const variant = new Map();
    variant.set("TODO","danger");
    variant.set("DOING","warning");
    variant.set("DONE","success");

    const transitions = new Map();
    transitions.set("TODO",["Doing","Done"]);
    transitions.set("DOING",["Done","Todo"]);
    transitions.set("DONE",["Todo","Doing"]);

    useEffect(()=>{
        const url = BASE_URL+"/getAllTasks/"+userId;
        const auth = {"Authorization":`Bearer ${token}`};
        axios.get(url,{headers:auth})
            .then((response) => {
                setTasks(response.data);
                setIsLoading(false);
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
            // eslint-disable-next-line
    },[isUpdated]);

    function markAs(taskId,status) {
        const url = BASE_URL+"/updateTaskStatus/"+userId+"/"+taskId+"/"+status;
        const auth = {"Authorization":`Bearer ${token}`};
        axios.put(url,{},{headers:auth})
            .then((response) => {
                dispatch(update());
                console.log(response.data);
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
    }

    function deleteTask(taskId) {
        const url = BASE_URL+"/deleteTask/"+userId+"/"+taskId;
        const auth = {"Authorization":`Bearer ${token}`};
        axios.delete(url,{headers:auth})
            .then((response) => {
                dispatch(update());
                console.log(response.data);
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
    }

    if(isLoading) {
        return (
            <Container fluid="xl" style={{textAlign:"center"}}>
                <Spinner animation="grow" variant="primary" style={{margin:"200px"}}/>
            </Container>
        );
    }

    if(isEmpty) {
        return (
            <Container fluid="xl" style={{color:"white",textAlign:"center"}}>
                <i class="fa-solid fa-list-check" style={{fontSize:"150px",margin:"155px"}}></i>
                <h6>You have no tasks. Add some tasks</h6><br/>
            </Container>
        );
    }

    return (
        <div>
            {tasks.map(task =>
                <Card bg={variant.get(task.status)} style={card}>
                    <Card.Body>
                        <Badge bg="dark" style={{padding:"9px"}}>{task.title}</Badge>
                        {"  "} {task.descrip} {"  "}
                        <DropdownButton title={<i class="fa-solid fa-ellipsis"/>} variant="dark" menuVariant="dark" size="sm" align="end" id="dropdown-menu-align-end" style={floatRight}>
                            {transitions.get(task.status).map(transition =>
                                <Dropdown.Item onClick={()=>{markAs(task.taskId,transition.toUpperCase());}}>
                                    Mark as {transition}
                                </Dropdown.Item>)}
                            <Dropdown.Item onClick={()=>{setCurrTaskId(task.taskId);setUpdateTask(true);}}>Update</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{deleteTask(task.taskId);}}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </Card.Body>
                </Card>)
            }
            <Modal show={updateTask} onHide={()=>setUpdateTask(false)} centered aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Task Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>            
                    <UpdateTask taskId={currTaskId}/>
                </Modal.Body>
            </Modal>                        
        </div>
    );
}

export default AllTasks;