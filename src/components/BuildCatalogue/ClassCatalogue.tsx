import { Button, Col, Container, ListGroup, Modal, Nav, Navbar, Row, Image, Spinner } from "react-bootstrap";
import {getAllClassBuilds} from "../Helpers/BuildHelper";
import BuildCard from "./BuildCard";
import { specImages } from "../../assets/gw2Assets/specs/SpecImages";
import { build } from "../Helpers/BuildHelper";
import { useRef, useState } from "react";

interface Props {
  buildImages:Map<string, string>
}

function ClassCatalogue(props:Props) {
    let buildImages = props.buildImages;

    var guardianBuilds = getAllClassBuilds("Guardian");
    var revenantBuilds = getAllClassBuilds("Revenant");
    var warriorBuilds = getAllClassBuilds("Warrior");
    var engineerBuilds = getAllClassBuilds("Engineer");
    var rangerBuilds = getAllClassBuilds("Ranger");
    var thiefBuilds = getAllClassBuilds("Thief");
    var elementalistBuilds = getAllClassBuilds("Elementalist");
    var mesmerBuilds = getAllClassBuilds("Mesmer");
    var necromancerBuilds = getAllClassBuilds("Necromancer");

    function getRoleName(build:build) {
        if (build.role == "DPS") {
            return build.dmgType + " " + build.role;
        } else if (build.role == "BoonDPS") {
            return build.dmgType + " " + build.boon + " DPS"
        } else {
            return "error"
        }
    }

    const [build, setBuild] = useState({
      id:0,
      role: "",
      dmgType: "",
      boon: "",
      class: "",
      spec: "",
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

    const [imageLoading, setImageLoading] = useState(true);

    function handleBuildSelect(build:build) {
      setBuild({
        id:build.id,
        role:build.role,
        dmgType:build.dmgType,
        boon:build.boon,
        class:build.class,
        spec:build.spec,
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

    const guardianRef = useRef<HTMLBRElement | null>(null);
    const revenantRef = useRef<HTMLBRElement | null>(null);
    const warriorRef = useRef<HTMLBRElement | null>(null);
    const engineerRef = useRef<HTMLBRElement | null>(null);
    const rangerRef = useRef<HTMLBRElement | null>(null);
    const thiefRef = useRef<HTMLBRElement | null>(null);
    const elementalistRef = useRef<HTMLBRElement | null>(null);
    const mesmerRef = useRef<HTMLBRElement | null>(null);
    const necromancerRef = useRef<HTMLBRElement | null>(null);
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
                  <Spinner style={{display: imageLoading ? "block" : "none"}} ></Spinner>
                  <Image fluid rounded src={buildImages.get('build' + build.id)} style={{display: imageLoading ? "none" : "block"}} onLoad={() => setImageLoading(false)}></Image>
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
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:guardianRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Guardian</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:revenantRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Revenant</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:warriorRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Warrior</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:engineerRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Engineer</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:rangerRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Ranger</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:thiefRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Thief</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:elementalistRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Elementalist</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:mesmerRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Mesmer</Nav.Link></Col>
        <Col><Nav.Link onClick={() => window.scroll({ behavior: 'smooth', top:necromancerRef.current!.getBoundingClientRect().y + window.scrollY - SCROLL_OFFSET})}>Necromancer</Nav.Link></Col>
        </Row>
      </Nav>
      </Navbar>
      <Container>
        <br ref={guardianRef} />
        <h2>Guardian Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: guardianBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(guardianBuilds[idx])} build={guardianBuilds[idx]} title={guardianBuilds[idx].spec} secondary={getRoleName(guardianBuilds[idx])} image={(specImages as any)[guardianBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={revenantRef} />
        <h2>Revenant Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: revenantBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(revenantBuilds[idx])} build={revenantBuilds[idx]} title={revenantBuilds[idx].spec} secondary={getRoleName(revenantBuilds[idx])} image={(specImages as any)[revenantBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={warriorRef} />
        <h2>Warrior Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: warriorBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(warriorBuilds[idx])} build={warriorBuilds[idx]} title={warriorBuilds[idx].spec} secondary={getRoleName(warriorBuilds[idx])} image={(specImages as any)[warriorBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={engineerRef} />
        <h2>Engineer Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: engineerBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(engineerBuilds[idx])} build={engineerBuilds[idx]} title={engineerBuilds[idx].spec} secondary={getRoleName(engineerBuilds[idx])} image={(specImages as any)[engineerBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={rangerRef} />
        <h2>Ranger Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: rangerBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(rangerBuilds[idx])} build={rangerBuilds[idx]} title={rangerBuilds[idx].spec} secondary={getRoleName(rangerBuilds[idx])} image={(specImages as any)[rangerBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={thiefRef} />
        <h2>Thief Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: thiefBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(thiefBuilds[idx])} build={thiefBuilds[idx]} title={thiefBuilds[idx].spec} secondary={getRoleName(thiefBuilds[idx])} image={(specImages as any)[thiefBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={elementalistRef} />
        <h2>Elementalist Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: elementalistBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(elementalistBuilds[idx])} build={elementalistBuilds[idx]} title={elementalistBuilds[idx].spec} secondary={getRoleName(elementalistBuilds[idx])} image={(specImages as any)[elementalistBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={mesmerRef} />
        <h2>Mesmer Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: mesmerBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(mesmerBuilds[idx])} build={mesmerBuilds[idx]} title={mesmerBuilds[idx].spec} secondary={getRoleName(mesmerBuilds[idx])} image={(specImages as any)[mesmerBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
        <br ref={necromancerRef} />
        <h2>Necromancer Builds</h2>
        <Row xs={2} sm={2} md={2} lg={2} xl={4} className="g-4">
            {Array.from({length: necromancerBuilds.length}).map((_, idx) => (
              <Col key={idx}>
                <BuildCard onClick={() => handleBuildSelect(necromancerBuilds[idx])} build={necromancerBuilds[idx]} title={necromancerBuilds[idx].spec} secondary={getRoleName(necromancerBuilds[idx])} image={(specImages as any)[necromancerBuilds[idx].spec].icon} />
              </Col>
            ))}
        </Row>
      </Container>
    </Container>
}

export default ClassCatalogue;