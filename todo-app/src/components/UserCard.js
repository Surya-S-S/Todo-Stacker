import { Outlet,Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

function UserCard() {
    const none={textDecoration:'none'};
    const width={width:'20rem',marginTop:'150px'};

    return (
        <Card className="mx-auto" bg="dark" style={width}>
            <Card.Header>
                <Nav fill variant="pills" defaultActiveKey="1">
                    <Nav.Item>
                        <Link to="/" style={none}>
                            <Nav.Link as="button" eventKey="1">Login</Nav.Link>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/Register" style={none}>
                            <Nav.Link as="button" eventKey="2">Register</Nav.Link>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Outlet/>
            </Card.Body>
        </Card>
    );
}

export default UserCard;