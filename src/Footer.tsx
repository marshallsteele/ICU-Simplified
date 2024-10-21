import { Container } from "react-bootstrap";

function Footer() {
    return (
        <footer>
            <Container style={{padding:"24px", marginTop:"24px"}} className="bg-dark text-white" fluid>
                This is an unofficial site that is not affiliated with or endorsed by ArenaNet. © ArenaNet LLC. 
                All rights reserved. NCSOFT, ArenaNet, Guild Wars, Guild Wars 2, GW2, Guild Wars 2: Heart of Thorns, 
                Guild Wars 2: Path of Fire, Guild Wars 2: End of Dragons, and Guild Wars 2: Secrets of the Obscure 
                and all associated logos, designs, and composite marks are trademarks or registered trademarks of 
                NCSOFT Corporation. All other trademarks are the property of their respective owners.
            </Container>
        </footer>
    )
}

export default Footer;