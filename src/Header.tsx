import { Container, Nav, Navbar } from "react-bootstrap";

interface Props {
    page:string,
    changePage:(page:string | null ) => void
  }

function Header(props:Props) {
    return <Navbar bg="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home" onClick={() => props.changePage("home")}>ICU Simplified</Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="me-auto"
                activeKey={props.page}
                onSelect={(selectedKey) => props.changePage(selectedKey)}>
                    <Nav.Link eventKey="role">Role</Nav.Link>
                    <Nav.Link eventKey="class">Class</Nav.Link>
                </Nav>
                    <Nav className="justify-content-end" 
                    activeKey={props.page}
                    onSelect={(selectedKey) => props.changePage(selectedKey)}>
                    <Nav.Link eventKey="builder">Builder</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
}

export default Header;