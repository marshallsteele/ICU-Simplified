import { Container } from "react-bootstrap";

function AdminPage() {
    return <Container>
        <br />
        <Container style={{padding:16, margin:0, backgroundColor: "rgba(0, 0, 0, 0.45)", color:"white", borderRadius: "1rem"}}>
            <h4>
                The idea of this page is to allow for easy adding of new builds and potentially editing of existing builds but is something for the future.
            </h4>
            <h4>
                The Auth required to avoid griefing is something I don't wanna deal with. Might just scrap.
            </h4>
        </Container>
    </Container>
}

export default AdminPage;