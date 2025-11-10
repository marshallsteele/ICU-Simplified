import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { specImages } from "../../assets/gw2Assets/specs/SpecImages";
import BuildCard from "./BuildCard";
import { getAllAlacrityDPSBuilds, getAllConditionDPSBuilds, getAllPowerDPSBuilds, getAllQuicknessDPSBuilds } from "../Helpers/BuildHelper";
import { useRef, useState } from "react";
import { build } from "../Helpers/BuildHelper";
import BuildModal from "./BuildModal";

function RoleCatalogue() {
    var powerDPSBuilds = getAllPowerDPSBuilds();
    var conditionDPSBuilds = getAllConditionDPSBuilds();
    var alacrityDPSBuilds = getAllAlacrityDPSBuilds();
    var quicknessDPSBuilds = getAllQuicknessDPSBuilds();

    const [build, setBuild] = useState({
      role: "",
      dmgType: "",
      boon: "",
      class: "",
      spec: "",
      notes: [""],
      variations: [""],
      healSkill: 0,
      utilitySkills: [0, 0, 0],
      eliteSkill: 0,
      traitLines:[0, 0, 0],
      traitLine1:[0, 0, 0],
      traitLine2:[0, 0, 0],
      traitLine3:[0, 0, 0],
      buildTemplate:"",
      primaryWeapons:[{type:"", stat:"", sigils:[0, 0]}],
      secondaryWeapons:[{type:"", stat:"", sigils:[0, 0]}],
      gear:[{type:"", stat:"", rune:0}],
      accessories:[{type:"", stat:""}],
      relic:0,
      dpsReportLink:"",
      instructions:[""]
    })

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    function handleBuildSelect(build:build) {
      setBuild({
        role:build.role,
        dmgType:build.dmgType,
        boon:build.boon,
        class:build.class,
        spec:build.spec,
        notes:build.notes,
        variations:build.variations,
        healSkill:build.healSkill,
        utilitySkills:build.utilitySkills,
        eliteSkill:build.eliteSkill,
        traitLines:build.traitLines,
        traitLine1:build.traitLine1,
        traitLine2:build.traitLine2,
        traitLine3:build.traitLine3,
        buildTemplate:build.buildTemplate,
        primaryWeapons:build.primaryWeapons,
        secondaryWeapons:build.secondaryWeapons,
        gear:build.gear,
        accessories:build.accessories,
        relic:build.relic,
        dpsReportLink:build.dpsReportLink,
        instructions:build.instructions
      })
      handleShow();
    }

    const powerDPSRef = useRef<HTMLBRElement | null>(null);
    const conditionDPSRef = useRef<HTMLBRElement | null>(null);
    const alacrityDPSRef = useRef<HTMLBRElement | null>(null);
    const quicknessDPSRef = useRef<HTMLBRElement | null>(null);
    const SCROLL_OFFSET = 100;

    return <Container style={{paddingTop:50, color:"white"}}>
      <BuildModal build={build} showModal={showModal} handleClose={handleClose}></BuildModal>
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