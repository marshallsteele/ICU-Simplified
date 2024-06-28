import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { build } from "../Helpers/BuildHelper";
import { ExpansionLogos } from "../../assets/gw2Assets/expansionLogos/ExpansionLogos";
import paintSmear from "../../assets/gw2Assets/accents/pattern4.png";
import BuildsUtil from "../../assets/BuildsUtil";
import { useState } from "react";

interface Props {
    title:string;
    secondary:string;
    image:string;
    build:build;
    onClick:() => void;
}

const styles = {
    card: {objectFit:"cover", opacity: "0.5", height: "350px"} as React.CSSProperties,
    hoverCard: {objectFit:"cover", opacity: "1", height: "350px"} as React.CSSProperties
}

function BuildCard(props: Props) {
    const [hoverState, setHoverState] = useState(false);

    return <Card data-bs-theme="dark" onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} onClick={props.onClick} className="specCard">
        <Card.Img className="specCardImage"  variant="top" style={hoverState ? styles.hoverCard : styles.card} src={props.image} />
        <Card.ImgOverlay>
        <Card.Body className="w-100 h-100 p-0 m-0">
            <Image src={paintSmear} style={{ maxWidth:"300px", width:"100%", position:"absolute", zIndex:0, margin:-16, opacity:0.7}}></Image>

            {/*CONTAINER FOR THE CARD: ROUNDED EDGES, HOVER EFFECTS, ETC*/}
            <Container style={{ padding:"0px", zIndex:1, position:"absolute" }}>
                <Row style={{ margin:"0px", height: '268px' }}>
                {/*BUILD INFO ROW*/}
                    <Col style={{color:"black"}}>
                    {/*BUILD TITLE AND SUBTITLE*/}
                    <h5>{props.title}</h5>
                    <h6>{props.secondary}</h6>
                    </Col>
                    <Col>
                    {/*BUILD DMG TYPE ICON AND OPTIONAL BOON ICON*/}
                    
                    </Col>
                </Row>
                <Row className="justify-content-start" style={{  margin:"0px", height: '50px'}}>
                {/*EXPANSION INFO ROW*/}
                    {Array.from({ length: BuildsUtil.getRequiredExpansions(props.build).length}).map((_, idx) => (
                    <Col className="justify-self-end" style={{ height: "50px", maxWidth: '60px', padding:"0px" }} key={idx}>
                        <Image 
                        style={{height: "100%", backgroundColor: "rgba(255, 255, 255, 0.75)", borderRadius: "25%"}} 
                        src={(ExpansionLogos as any)[BuildsUtil.getRequiredExpansions(props.build)[idx]].small} />
                    </Col>
                    ))}
                </Row>
            </Container>
        </Card.Body>
        </Card.ImgOverlay>
    </Card>
}

export default BuildCard;
