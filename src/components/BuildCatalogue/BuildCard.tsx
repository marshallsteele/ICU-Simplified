import { Card, Row, Col, Image, Container } from "react-bootstrap";
import { build } from "../Helpers/BuildHelper";
import { ExpansionLogos } from "../../assets/gw2Assets/expansionLogos/ExpansionLogos";
import paintSmear from "../../assets/gw2Assets/accents/pattern4.png";
import BuildsUtil from "../../assets/BuildsUtil";
import { useEffect, useState } from "react";

interface Props {
    title:string;
    secondary:string;
    image:string;
    build:build;
    onClick:() => void;
}

const styles = {
    card: {objectFit:"cover", opacity: "0.5", height: "350px"} as React.CSSProperties,
    hoverCard: {objectFit:"cover", opacity: "1", height: "350px", cursor:"pointer"} as React.CSSProperties
}

function BuildCard(props: Props) {
    const [hoverState, setHoverState] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hoverState ? 'pointer' : 'auto'
      }, [hoverState])

    return <Card data-bs-theme="dark" onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)} onClick={props.onClick} className="specCard">
        <Card.Img className="specCardImage"  variant="top" style={{objectFit:"cover", opacity: hoverState ? "1" : "0.5", height: "350px"}} src={props.image} />
        <Card.ImgOverlay className="p-0 m-0">
        <Card.Body className="w-100 h-100 p-0 m-0">
            <Image src={paintSmear} style={{ borderRadius:"var(--bs-border-radius)", maxWidth:"300px", width:"100%", position:"absolute", zIndex:0, opacity:0.7}}></Image>

            <Container style={{ padding:"16px", zIndex:1, position:"absolute" }}>
                <Row style={{ margin:"0px", height: '268px' }}>
                    <Col style={{color:"black"}}>
                    <h5>{props.title}</h5>
                    <h6>{props.secondary}</h6>
                    </Col>
                </Row>
                <Row className="justify-content-start" style={{  margin:"0px", height: '50px'}}>
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
