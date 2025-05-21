import { Container,Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";

function HomePage() {
    const [showToast,setShowToast] = useState(false);

    useEffect(()=>{
        setShowToast(true);
        window.setTimeout(()=>{setShowToast(false)},2000);
    },[]);

    return (
        <Container fluid="xxxl">
            <Header isLogin={false}/>
            <ToastContainer position="top-end" style={{margin:'7px'}}>
                <Toast show={showToast} autohide="true" bg="primary" style={{width:"fit-content"}}>
                    <Toast.Body>Welcome {localStorage.getItem("userName")} !</Toast.Body>
                </Toast>
            </ToastContainer>
            <Container fluid="xl">
                <TaskCard/>
            </Container>
        </Container>
    );
}

export default HomePage;