import { Container, Row, Col, Modal, Button, Image, ListGroup, Nav, Navbar } from "react-bootstrap";
import { specImages } from "../../assets/gw2Assets/specs/SpecImages";
import BuildCard from "./BuildCard";
import { getAllAlacrityDPSBuilds, getAllConditionDPSBuilds, getAllPowerDPSBuilds, getAllQuicknessDPSBuilds } from "../Helpers/BuildHelper";
import { useRef, useState } from "react";
import { build } from "../Helpers/BuildHelper";

interface Props {
  buildImages:Map<string, string>
}

function RoleCatalogue(props:Props) {
    let buildImages = props.buildImages;

    var powerDPSBuilds = getAllPowerDPSBuilds();
    var conditionDPSBuilds = getAllConditionDPSBuilds();
    var alacrityDPSBuilds = getAllAlacrityDPSBuilds();
    var quicknessDPSBuilds = getAllQuicknessDPSBuilds();

    const [build, setBuild] = useState({
      id:0,
      role: "",
      dmgType: "",
      boon: "",
      class: "",
      spec: "",
      recExpansions: [""],
      notes: [""],
      exoticGearLink:"",
      ascendedGearLink:"",
      buildTemplate:"",
      primaryWeapons:[""],
      secondaryWeapons:[""],
      runes:"",
      sigils:[""],
      relic:"",
      dpsReportLink:"",
      instructions:[""]
    })

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    function handleBuildSelect(build:build) {
      setBuild({
        id:build.id,
        role:build.role,
        dmgType:build.dmgType,
        boon:build.boon,
        class:build.class,
        spec:build.spec,
        recExpansions:build.recExpansions,
        notes:build.notes,
        exoticGearLink:build.exoticGearLink,
        ascendedGearLink:build.ascendedGearLink,
        buildTemplate:build.buildTemplate,
        primaryWeapons:build.primaryWeapons,
        secondaryWeapons:build.secondaryWeapons,
        runes:build.runes,
        sigils:build.sigils,
        relic:build.relic,
        dpsReportLink:build.dpsReportLink,
        instructions:build.instructions
      })
      handleShow();
    }

    function getBuildName(build:build) {
      if (build.role == "DPS") {
          return build.dmgType + " " + build.role + " " + build.spec;
      } else if (build.role == "BoonDPS") {
          return build.dmgType + " " + build.boon + " DPS " + build.spec;
      } else {
          return "error"
      }
    }

    const powerDPSRef = useRef<HTMLBRElement | null>(null);
    const conditionDPSRef = useRef<HTMLBRElement | null>(null);
    const alacrityDPSRef = useRef<HTMLBRElement | null>(null);
    const quicknessDPSRef = useRef<HTMLBRElement | null>(null);
    const SCROLL_OFFSET = 100;

    return <Container style={{paddingTop:50, color:"white"}}>
      <Modal
        show={showModal}  
        onHide={handleClose}
        size="xl"
        centered
        data-bs-theme="dark"
        style={{color:"white"}}>
            <Modal.Header
                closeButton>
                    <Modal.Title>
                        {getBuildName(build)}
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <Container style={{padding:16, margin:0, backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: "1rem"}}>
                  <Container>
                    <Row>
                      <h3>Weapons</h3>
                      <Col>
                        {build.primaryWeapons.length > 0 ? build.primaryWeapons[0] : ""}
                        {build.primaryWeapons.length > 1 ? "/" + build.primaryWeapons[1] : ""}
                      </Col>
                      <Col>
                        {build.secondaryWeapons.length > 0 ? build.secondaryWeapons[0] : ""}
                        {build.secondaryWeapons.length > 1 ? "/" + build.secondaryWeapons[1] : ""}
                      </Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <Col>
                      <h3>Runes</h3>
                      {build.runes}
                      </Col>
                      <Col>
                      <h3>Sigils</h3>
                      {build.sigils.length > 0 ? build.sigils[0] : ""}
                      {build.sigils.length > 1 ? "/" + build.sigils[1] : ""}
                      </Col>
                      <Col>
                      <h3>Relic</h3>
                      {build.relic}
                      </Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <h3>Build</h3>
                      <Col>
                      <Button size="lg" href={build.exoticGearLink} target="_blank" disabled={build.exoticGearLink === ""}>Exotic Gear</Button>
                      </Col>
                      <Col>
                      <Button size="lg" href={build.ascendedGearLink} target="_blank" disabled={build.ascendedGearLink === ""}>Ascended Gear</Button>
                      </Col>
                    </Row>
                  </Container>
                  </Container>
                  <br />
                  <Container style={{padding:0}}>
                  <Image fluid rounded src={buildImages.get('build' + build.id)}></Image>
                  </Container>
                  <br />
                </Col>
                <Col  xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <Container  style={{padding:16, margin:0, backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: "1rem"}}>
                    <h3>Build Notes</h3>
                    <ListGroup as="ol">
                      {build.notes.map((note, index) => <ListGroup.Item key={index} as="li">{note}</ListGroup.Item>)}
                    </ListGroup>
                  </Container>
                  <br />
                  <Container style={{padding:16, margin:0, backgroundColor: "rgba(255, 255, 255, 0.15)", borderRadius: "1rem"}}>
                    <h3>Instructions</h3>
                    <ListGroup as="ol" numbered>
                      {build.instructions.map((instruction, index) => <ListGroup.Item key={index} as="li"  data-bs-theme="dark">{instruction}</ListGroup.Item>)}
                    </ListGroup>
                  </Container>
                  <br />
                  <Container>
                  {build.dpsReportLink.length == 0 ? null :<Button size="lg" href={build.dpsReportLink} target="_blank">DPS Report</Button>}
                  </Container>
                </Col>
              </Row>
            </Modal.Body>
      </Modal>
      <Navbar bg="dark" style={{
        position: "sticky",
        top: 56,
        zIndex:2
      }}>
      <Nav style={{width:"100%", borderRadius:"100px"}}>
        <Row style={{width:"100%"}}>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:powerDPSRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Power DPS</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:conditionDPSRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Condition DPS</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:alacrityDPSRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Alacrity DPS</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:quicknessDPSRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Quickness DPS</Nav.Link></Col>
        </Row>
      </Nav>
      </Navbar>
      <Container>
        <br ref={powerDPSRef} />
        <h2>Power DPS</h2>
        <Row xs={1} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: powerDPSBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(powerDPSBuilds[idx])} build={powerDPSBuilds[idx]} title={powerDPSBuilds[idx].class} secondary={powerDPSBuilds[idx].spec} image={(specImages as any)[powerDPSBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={conditionDPSRef} />
        <h2>Condition DPS</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: conditionDPSBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(conditionDPSBuilds[idx])}  build={conditionDPSBuilds[idx]} title={conditionDPSBuilds[idx].class} secondary={conditionDPSBuilds[idx].spec} image={(specImages as any)[conditionDPSBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={alacrityDPSRef} />
        <h2>Alacrity DPS</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: alacrityDPSBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(alacrityDPSBuilds[idx])}  build={alacrityDPSBuilds[idx]} title={alacrityDPSBuilds[idx].class} secondary={alacrityDPSBuilds[idx].spec} image={(specImages as any)[alacrityDPSBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={quicknessDPSRef} />
        <h2>Quickness DPS</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: quicknessDPSBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(quicknessDPSBuilds[idx])}  build={quicknessDPSBuilds[idx]} title={quicknessDPSBuilds[idx].class} secondary={quicknessDPSBuilds[idx].spec} image={(specImages as any)[quicknessDPSBuilds[idx].spec].icon} />
              </Col>
            ))}
          </Row>
      </Container>
    </Container>
}

export default RoleCatalogue;