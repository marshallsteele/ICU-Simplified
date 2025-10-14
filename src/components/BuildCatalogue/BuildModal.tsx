import { Modal, Row, Col, Image, Container, Button, ListGroup } from "react-bootstrap";
import { build } from "../Helpers/BuildHelper";
import { CreateItem, TraitLine } from "@discretize/gw2-ui-new";
import '@discretize/gw2-ui-new/dist/default_style.css';
import '@discretize/gw2-ui-new/dist/index.css';
import '@discretize/typeface-menomonia';

interface Props {
    showModal:boolean;
    runes:any[];
    sigils:any[];
    relics:any[];
    build:build;
    handleClose: () => void;
}

function BuildModal(props: Props) {
    let runes = props.runes;
    let sigils = props.sigils;
    let relics = props.relics;
    let showModal = props.showModal;
    let build = props.build;
    let handleClose = props.handleClose;
    
function getBuildName(build:build) {
  if (build.role == "DPS") {
      return build.dmgType + " " + build.role + " " + build.spec;
  } else if (build.role == "BoonDPS") {
      return build.dmgType + " " + build.boon + " DPS " + build.spec;
  } else {
      return "error"
  }
}

function getRuneImg(build:build) {
  var icon = "";
  var runeSuffix = build.runes;
  for (let i = 0; i < runes.length; i++) {
    if (runes[i].name == "Superior Rune of " + runeSuffix 
      || runes[i].name == "Superior Rune of the " + runeSuffix) 
    {
      icon = runes[i].icon;
      break;
    }
  }
  return icon;
}

function getSigilImg(build:build) {
  var icon = [];
  for (let i = 0; i < build.sigils.length; i++) {
    var sigilSuffix = build.sigils[i];
    for (let j = 0; j < sigils.length; j++) {
      if (sigils[j].name == "Superior Sigil of " + sigilSuffix 
        || sigils[j].name == "Superior Sigil of the " + sigilSuffix) 
      {
        icon[i] = sigils[j].icon;
        break;
      }
    }
  }
  return icon;
}

function getRelicImg(build:build) {
  var icon = "";
  var relicSuffix = build.relic;
  for (let i = 0; i < relics.length; i++) {
    if (relics[i].name == "Relic of " + relicSuffix 
      || relics[i].name == "Relic of the " + relicSuffix) 
    {
      icon = relics[i].icon;
      break;
    }
  }
  return icon;
}

    return <Modal
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
                      <Col xxl={build.secondaryWeapons.length > 0 ? 6 : 12}>
                        <div style={{fontSize:'4rem', display:'flex', justifyContent:'space-around'}}>
                        {build.primaryWeapons.length > 0 ? <CreateItem disableText type={build.primaryWeapons[0]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        {build.primaryWeapons.length > 1 ? <CreateItem disableText type={build.primaryWeapons[1]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        </div>
                        <div style={{fontSize:'1rem', display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        {build.primaryWeapons.length > 0 ? <CreateItem disableIcon type={build.primaryWeapons[0]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        {build.primaryWeapons.length > 1 ? <CreateItem disableIcon type={build.primaryWeapons[1]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        </div>
                      </Col>
                      <Col xxl={build.secondaryWeapons.length > 0 ? 6 : 12}>
                        <div style={{fontSize:'4rem', display:'flex', justifyContent:'space-around'}}>
                        {build.secondaryWeapons.length > 0 ? <CreateItem disableText type={build.secondaryWeapons[0]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        {build.secondaryWeapons.length > 1 ? <CreateItem disableText type={build.secondaryWeapons[1]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        </div>
                        <div style={{fontSize:'1rem', display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        {build.secondaryWeapons.length > 0 ? <CreateItem disableIcon type={build.secondaryWeapons[0]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        {build.secondaryWeapons.length > 1 ? <CreateItem disableIcon type={build.secondaryWeapons[1]} stat="Berserker" rarity="Exotic"></CreateItem> : ""}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row>
                      <Col>
                      <h3>Runes</h3>
                      <Image fluid rounded src={getRuneImg(build)}></Image>
                      <br></br>
                      {build.runes}
                      </Col>
                      <Col>
                      <h3>Sigils</h3>
                      <Image fluid rounded src={getSigilImg(build)[0]}></Image>
                      {build.sigils.length > 1 ? <Image fluid rounded src={getSigilImg(build)[1]}></Image> : ""}
                      <br></br>
                      {build.sigils.length > 0 ? build.sigils[0] : ""}
                      {build.sigils.length > 1 ? "/" + build.sigils[1] : ""}
                      </Col>
                      <Col>
                      <h3>Relic</h3>
                      <Image fluid rounded src={getRelicImg(build)}></Image>
                      <br></br>
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
                    <TraitLine id={build.traitLines[0]} defaultSelected={build.traitLine1} selectable={false} resettable />
                    <TraitLine id={build.traitLines[1]} defaultSelected={build.traitLine2} selectable={false} resettable />
                    <TraitLine id={build.traitLines[2]} defaultSelected={build.traitLine3} selectable={false} resettable />
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
}

export default BuildModal;
