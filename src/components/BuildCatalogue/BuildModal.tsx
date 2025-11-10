import { Modal, Row, Col, Container, Button, ListGroup } from "react-bootstrap";
import { build } from "../Helpers/BuildHelper";
import { CreateItem, Item, Skill, TraitLine } from "@discretize/gw2-ui-new";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/typeface-menomonia";
import TextWithSkills from "./TextWithSkills";

interface Props {
  showModal: boolean;
  build: build;
  handleClose: () => void;
}

function BuildModal(props: Props) {
  let showModal = props.showModal;
  let build = props.build;
  let handleClose = props.handleClose;

  function getBuildName(build: build) {
    if (build.role == "DPS") {
      return build.dmgType + " " + build.role + " " + build.spec;
    } else if (build.role == "BoonDPS") {
      return build.dmgType + " " + build.boon + " DPS " + build.spec;
    } else {
      return "error";
    }
  }

  function getBuildWeight(profession: string) {
    if (
      profession == "Guardian" ||
      profession == "Warrior" ||
      profession == "Revenant"
    ) {
      return "Heavy";
    } else if (
      profession == "Thief" ||
      profession == "Ranger" ||
      profession == "Engineer"
    ) {
      return "Medium";
    } else {
      return "Light";
    }
  }

  async function copyBuild(template: string) {
    try {
      await navigator.clipboard.writeText(template);
      alert(
        "Successfully copied build template. Paste this in game for quick import."
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text.");
    }
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="xl"
      centered
      data-bs-theme="dark"
      style={{ color: "white" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{getBuildName(build)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xl={12} xxl={6}>
            <Container
              style={{
                padding: 8,
                margin: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h3>Gear</h3>
                <Button
                  onClick={() => copyBuild(build.buildTemplate)}
                  variant="outline-dark"
                  style={{ padding: 0 }}
                >
                  <svg
                    style={{ width: "3rem", height: "2rem" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                  >
                    {/*<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z" />
                  </svg>
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 16,
                    margin: 16,
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                    borderRadius: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "4rem",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {build.primaryWeapons.length > 0 ? (
                      <div
                        style={{
                          marginRight: "15px",
                          marginLeft: "15px",
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        {build.secondaryWeapons[0].type != "Spear" ? (
                          <CreateItem
                            style={{
                              display: "block",
                              zIndex: 1,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            type={build.primaryWeapons[0].type}
                            stat={build.primaryWeapons[0].stat}
                            upgrades={build.primaryWeapons[0].sigils}
                          ></CreateItem>
                        ) : (
                          <Item
                            style={{
                              display: "block",
                              zIndex: 1,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            id={103815}
                            stat={build.primaryWeapons[0].stat}
                            upgrades={build.primaryWeapons[0].sigils}
                          ></Item>
                        )}
                        <Item
                          style={{
                            fontSize: "2rem",
                            position: "absolute",
                            bottom: -6,
                            left: -8,
                            zIndex: 2,
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                          }}
                          disableText
                          id={build.primaryWeapons[0].sigils[0]}
                        ></Item>
                        {build.primaryWeapons[0].sigils.length > 1 && (
                          <Item
                            style={{
                              fontSize: "2rem",
                              position: "absolute",
                              bottom: -6,
                              right: -8,
                              zIndex: 2,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            id={build.primaryWeapons[0].sigils[1]}
                          ></Item>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    {build.primaryWeapons.length > 1 ? (
                      <div
                        style={{
                          marginRight: "15px",
                          marginLeft: "15px",
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <CreateItem
                          style={{
                            display: "block",
                            zIndex: 1,
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                          }}
                          disableText
                          type={build.primaryWeapons[1].type}
                          stat={build.primaryWeapons[1].stat}
                          upgrades={build.primaryWeapons[1].sigils}
                        ></CreateItem>
                        <Item
                          style={{
                            fontSize: "2rem",
                            position: "absolute",
                            bottom: -6,
                            left: -8,
                            zIndex: 2,
                            padding: 0,
                            margin: 0,
                            lineHeight: 1,
                          }}
                          disableText
                          id={build.primaryWeapons[1].sigils[0]}
                        ></Item>
                        {build.primaryWeapons[1].sigils.length > 1 && (
                          <Item
                            style={{
                              fontSize: "2rem",
                              position: "absolute",
                              bottom: -6,
                              right: -8,
                              zIndex: 2,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            id={build.primaryWeapons[1].sigils[1]}
                          ></Item>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {build.secondaryWeapons.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 16,
                      margin: 16,
                      backgroundColor: "rgba(0, 0, 0, 0.25)",
                      borderRadius: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "4rem",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {build.secondaryWeapons.length > 0 ? (
                        <div
                          style={{
                            marginRight: "15px",
                            marginLeft: "15px",
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          {build.secondaryWeapons[0].type != "Spear" ? (
                            <CreateItem
                              style={{
                                display: "block",
                                zIndex: 1,
                                padding: 0,
                                margin: 0,
                                lineHeight: 1,
                              }}
                              disableText
                              type={build.secondaryWeapons[0].type}
                              stat={build.secondaryWeapons[0].stat}
                              upgrades={build.secondaryWeapons[0].sigils}
                            ></CreateItem>
                          ) : (
                            <Item
                              style={{
                                display: "block",
                                zIndex: 1,
                                padding: 0,
                                margin: 0,
                                lineHeight: 1,
                              }}
                              disableText
                              id={103815}
                              stat={build.secondaryWeapons[0].stat}
                              upgrades={build.secondaryWeapons[0].sigils}
                            ></Item>
                          )}
                          <Item
                            style={{
                              fontSize: "2rem",
                              position: "absolute",
                              bottom: -6,
                              left: -8,
                              zIndex: 2,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            id={build.secondaryWeapons[0].sigils[0]}
                          ></Item>
                          {build.secondaryWeapons[0].sigils.length > 1 && (
                            <Item
                              style={{
                                fontSize: "2rem",
                                position: "absolute",
                                bottom: -6,
                                right: -8,
                                zIndex: 2,
                                padding: 0,
                                margin: 0,
                                lineHeight: 1,
                              }}
                              disableText
                              id={build.secondaryWeapons[0].sigils[1]}
                            ></Item>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      {build.secondaryWeapons.length > 1 ? (
                        <div
                          style={{
                            marginRight: "15px",
                            marginLeft: "15px",
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <CreateItem
                            style={{
                              display: "block",
                              zIndex: 1,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            type={build.secondaryWeapons[1].type}
                            stat={build.secondaryWeapons[1].stat}
                            upgrades={build.secondaryWeapons[1].sigils}
                          ></CreateItem>
                          <Item
                            style={{
                              fontSize: "2rem",
                              position: "absolute",
                              bottom: -6,
                              left: -8,
                              zIndex: 2,
                              padding: 0,
                              margin: 0,
                              lineHeight: 1,
                            }}
                            disableText
                            id={build.secondaryWeapons[1].sigils[0]}
                          ></Item>
                          {build.secondaryWeapons[1].sigils.length > 1 && (
                            <Item
                              style={{
                                fontSize: "2rem",
                                position: "absolute",
                                bottom: -6,
                                right: -8,
                                zIndex: 2,
                                padding: 0,
                                margin: 0,
                                lineHeight: 1,
                              }}
                              disableText
                              id={build.secondaryWeapons[1].sigils[1]}
                            ></Item>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 16,
                  margin: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  borderRadius: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {build.gear.map((armour, index) => (
                    <div
                      style={{
                        margin: "5px",
                        position: "relative",
                        display: "inline-block",
                      }}
                      key={index}
                    >
                      <CreateItem
                        disableText
                        style={{
                          display: "block",
                          zIndex: 1,
                          padding: 0,
                          margin: 0,
                          lineHeight: 1,
                        }}
                        type={armour.type}
                        upgrades={[armour.rune]}
                        weight={getBuildWeight(build.class)}
                        stat={armour.stat}
                        rarity="Ascended"
                      ></CreateItem>
                      <Item
                        style={{
                          fontSize: "2rem",
                          position: "absolute",
                          bottom: -2,
                          right: -4,
                          zIndex: 2,
                          padding: 0,
                          margin: 0,
                          lineHeight: 1,
                        }}
                        disableText
                        id={armour.rune}
                      ></Item>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 16,
                  margin: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  borderRadius: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {build.accessories.map((accessory, index) => (
                    <CreateItem
                      disableText
                      style={{ margin: "5px", padding: 0, lineHeight: 1 }}
                      type={accessory.type}
                      stat={accessory.stat}
                      rarity="Ascended"
                      key={index}
                    ></CreateItem>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 16,
                  margin: 16,
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  borderRadius: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "4rem",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {build.healSkill != 0 && (
                    <Skill
                      style={{ margin: "5px", padding: 0, lineHeight: 1 }}
                      disableText
                      id={build.healSkill}
                    ></Skill>
                  )}
                  {build.utilitySkills.map((skill, index) => (
                    <Skill
                      style={{ margin: "5px", padding: 0, lineHeight: 1 }}
                      disableText
                      id={skill}
                      key={index}
                    ></Skill>
                  ))}
                  {build.eliteSkill != 0 && (
                    <Skill
                      style={{ margin: "5px", padding: 0, lineHeight: 1 }}
                      disableText
                      id={build.eliteSkill}
                    ></Skill>
                  )}
                  <Item
                    style={{ margin: "5px", padding: 0, lineHeight: 1 }}
                    disableText
                    id={build.relic}
                  ></Item>
                </div>
              </div>
            </Container>
            <br />
          </Col>
          <Col xl={12} xxl={6}>
            {build.notes.length > 0 && (
              <div>
                <Container
                  style={{
                    padding: 16,
                    margin: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "1rem",
                  }}
                >
                  <h3>Build Notes</h3>
                  <ListGroup as="ol">
                    {build.notes.map((note, index) => (
                      <ListGroup.Item
                        style={{ margin: "5px" }}
                        key={index}
                        as="li"
                      >
                        <TextWithSkills text={note}></TextWithSkills>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Container>
                <br />
              </div>
            )}
            {build.variations.length > 0 && (
              <div>
                <Container
                  style={{
                    padding: 16,
                    margin: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "1rem",
                  }}
                >
                  <h3>Build Variations</h3>
                  <ListGroup as="ol">
                    {build.variations.map((variation, index) => (
                      <ListGroup.Item
                        style={{ margin: "5px" }}
                        key={index}
                        as="li"
                      >
                        <TextWithSkills text={variation}></TextWithSkills>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Container>
                <br />
              </div>
            )}
            <Container
              style={{
                padding: 16,
                margin: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "1rem",
              }}
            >
              <h3>Trait Lines & Traits</h3>
              <div
                style={{
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TraitLine
                  id={build.traitLines[0]}
                  defaultSelected={build.traitLine1}
                  selectable={false}
                  resettable
                />
                <TraitLine
                  id={build.traitLines[1]}
                  defaultSelected={build.traitLine2}
                  selectable={false}
                  resettable
                />
                <TraitLine
                  id={build.traitLines[2]}
                  defaultSelected={build.traitLine3}
                  selectable={false}
                  resettable
                />
              </div>
            </Container>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xxl={12}>
            <Container
              style={{
                padding: 16,
                margin: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "1rem",
              }}
            >
              <h3>Instructions</h3>
              <ListGroup as="ol" numbered>
                {build.instructions.map((instruction, index) => (
                  <ListGroup.Item
                    style={{ margin: "5px" }}
                    key={index}
                    as="li"
                    data-bs-theme="dark"
                  >
                    <TextWithSkills text={instruction}></TextWithSkills>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
            <br />
            <Container>
              {build.dpsReportLink.length == 0 ? null : (
                <Button size="lg" href={build.dpsReportLink} target="_blank">
                  DPS Report
                </Button>
              )}
            </Container>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default BuildModal;
