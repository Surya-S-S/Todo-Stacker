import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import UserCard from "../components/UserCard";

function LoginPage() {
    return (
        <Container fluid="xxxl">
            <Header isLogin={true}/>
            <br/>
            <Container fluid="xl">
                <UserCard/>
            </Container>
        </Container>
    );
}

export default LoginPage;