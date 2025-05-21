import { Outlet,Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container,Row,Col,Modal } from "react-bootstrap";
import { useState } from "react";
import AddTask from "../forms/AddTask";

function TaskCard() {
    const none={textDecoration:'none'};
    const floatRight={float:'right'};
    const [addTask,setAddTask] = useState(false);

    return (
        <div>
            <Card bg="dark" style={{marginTop:"35px"}}>        
                <Card.Header>
                    <Container fluid="xl" style={{paddingTop:'10px'}}>
                        <Row>
                            <Col><Nav variant="pills" defaultActiveKey="1">
                                <Nav.Item>
                                    <Link to="/home" style={none}>
                                        <Nav.Link as="button" eventKey="1">All</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/home/TodoTasks" style={none}>
                                        <Nav.Link as="button" eventKey="2">Todo</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/home/DoingTasks" style={none}>
                                        <Nav.Link as="button" eventKey="3">Doing</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/home/DoneTasks" style={none}>
                                        <Nav.Link as="button" eventKey="4">Done</Nav.Link>
                                    </Link>
                                </Nav.Item>                    
                            </Nav></Col>
                            <Col xs="auto"><Button variant="outline-primary" style={floatRight} onClick={()=>setAddTask(true)}>Add Task</Button></Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body style={{minHeight:"555px"}}>
                    <Outlet/>
                </Card.Body>
            </Card>
            <Modal show={addTask} onHide={()=>setAddTask(false)} centered aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Describe your Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>            
                    <AddTask/>
                </Modal.Body>
            </Modal>        
        </div>
    );    
}

export default TaskCard;