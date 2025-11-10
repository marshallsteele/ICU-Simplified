import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import BuildsUtil from "../assets/BuildsUtil";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
} from "react-hook-form";
import { TraitLine } from "@discretize/gw2-ui-new";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/typeface-menomonia";

const GW2APIURL = "https://api.guildwars2.com/v2";
const professionsEndpoint = GW2APIURL + "/professions";
const specializationsEndpoint = GW2APIURL + "/specializations";

type Weapon = {
  type: string;
  stat: string;
  sigils: number[];
};

type Armour = {
  type: string;
  stat: string;
  rune: number;
};

type Accessory = {
  type: string;
  stat: string;
};

type Build = {
  role: string;
  dmgType: string;
  boon: string;
  class: string;
  spec: string;
  notes: string;
  variations: string;
  healSkill: number;
  utilitySkills: number[];
  eliteSkill: number;
  traitLines: number[];
  traitLine1: number[];
  traitLine2: number[];
  traitLine3: number[];
  buildTemplate: string;
  primaryWeapons: Weapon[];
  secondaryWeapons: Weapon[];
  enableSecondary?: boolean;
  gear: Armour[];
  accessories: Accessory[];
  relic: number;
  dpsReportLink: string;
  instructions: string;
};

function BuildBuilder() {
  const armourParts = [
    "Helm",
    "Shoulders",
    "Coat",
    "Gloves",
    "Leggings",
    "Boots",
  ];
  const accessoryParts = [
    "Amulet",
    "Ring",
    "Ring",
    "Accessory",
    "Accessory",
    "Back Item",
  ];

  const [professions, setProfessions] = useState([]);
  const [allTraitLines, setAllTraitLines] = useState<any[]>([]);
  const [traitLinesAvailable, setTraitLinesAvailable] = useState<number[]>([]);
  const [specs, setSpecs] = useState([]);
  const [showSecondary, setShowSecondary] = useState(false);
  const [isRevenant, setIsRevenant] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jsonString, setJsonString] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProfessions();
    fetchAllTraitLines();
  }, []);

  const fetchProfessions = async () => {
    try {
      const response = await fetch(professionsEndpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setProfessions(data);
    } catch (error: any) {
      console.log("Error fetching professions: " + error.message);
    }
  };

  const fetchAllTraitLines = async () => {
    try {
      const response = await fetch(specializationsEndpoint + "?ids=all");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setAllTraitLines(data);
    } catch (error: any) {
      console.log("Error fetching professions: " + error.message);
    }
  };

  const fetchTraitLines = async (professionId: string) => {
    try {
      const res = await fetch(`${professionsEndpoint}/${professionId}`);
      const data = await res.json();
      setTraitLinesAvailable(data.specializations); // this is an array of trait line IDs
    } catch (err) {
      console.error("Error fetching profession trait lines", err);
    }
  };

  const handleProfessionSelected = (event: any) => {
    const professionId = event.target.value;
    setIsRevenant(professionId === "Revenant");
    setSpecs(BuildsUtil.getSpecs(professionId));
    fetchTraitLines(professionId);
    setValue(`class`, professionId, { shouldValidate: true });
    setValue("spec", "");
    setValue("traitLines", []);
    setValue("traitLine1", []);
    setValue("traitLine2", []);
    setValue("traitLine3", []);
  };

  const handleSetAllArmorStat = (stat: string) => {
    armourParts.forEach((_part, index) => {
      setValue(`gear.${index}.stat`, stat, { shouldValidate: true });
    });
  };

  const handleSetAllArmorRune = (rune: number) => {
    armourParts.forEach((_part, index) => {
      setValue(`gear.${index}.rune`, rune, { shouldValidate: true });
    });
  };

  const handleSetAllAccessories = (stat: string) => {
    accessoryParts.forEach((part, index) => {
      setValue(`accessories.${index}.stat`, stat, { shouldValidate: true });
      setValue(`accessories.${index}.type`, part, { shouldValidate: true });
    });
  };

  const traitLineOptions = traitLinesAvailable
    .map((id) => allTraitLines.find((t) => t.id === id))
    .filter(Boolean);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Build>();
  const primaryWeapons = useFieldArray<Build, "primaryWeapons", "id">({
    control,
    name: "primaryWeapons",
  });
  const secondaryWeapons = useFieldArray<Build, "secondaryWeapons", "id">({
    control,
    name: "secondaryWeapons",
  });
  const watchPrimaryWeapons = watch("primaryWeapons");
  const watchSecondaryWeapons = watch("secondaryWeapons");
  const traitLines = watch("traitLines") as number[];

  const getHandsUsed = (weapons: Weapon[]) => {
    return weapons.reduce((total, weapon) => {
      const typeMeta = BuildsUtil.getWeapons().find(
        (w) => w.type === weapon.type
      );
      return total + (typeMeta?.hands || 0);
    }, 0);
  };

  function buildReplacer(key: string, value: any) {
    const stringToArrayFields = ["notes", "variations", "instructions"];

    if (stringToArrayFields.includes(key)) {
      if (typeof value === "string") {
        return value.trim() ? value.split("\n") : [];
      }
    }

    if (key === "secondaryWeapons" && !showSecondary) {
      return [];
    }

    if (key === "secondaryWeapons" || key === "primaryWeapons") {
      for (let index = 0; index < value.length; index++) {
        const weapon = value[index];
        if (
          BuildsUtil.getWeapons().find((w) => w.type === weapon.type)?.hands ===
          1
        ) {
          value[index].sigils = value[index].sigils.slice(0, 1);
        }
      }
    }

    if ((key === "healSkill" || key === "eliteSkill") && Number.isNaN(value)) {
      return 0;
    }

    if (key === "utilitySkills") {
      return value.filter((x: any) => !Number.isNaN(x));
    }

    return value;
  }

  const objectToJsString = (obj: any, indent: number = 2): string => {
    const spacing = " ".repeat(indent);

    if (Array.isArray(obj)) {
      const arrayItems = obj
        .map((item) => objectToJsString(item, indent + 2))
        .join(",\n" + spacing);
      return `[\n${spacing}${arrayItems}\n${" ".repeat(indent - 2)}]`;
    } else if (obj !== null && typeof obj === "object") {
      const entries = Object.entries(obj).map(([key, value]) => {
        const formattedValue = objectToJsString(value, indent + 2);
        return `${spacing}${key}: ${formattedValue}`;
      });
      return `{\n${entries.join(",\n")}\n${" ".repeat(indent - 2)}}`;
    } else if (typeof obj === "string") {
      return `"${obj}"`;
    } else {
      return String(obj); // number, boolean, or null
    }
  };

  const onSubmit: SubmitHandler<Build> = (data) => {
    const jsonWithReplacer = JSON.parse(JSON.stringify(data, buildReplacer));
    const jsString = objectToJsString(jsonWithReplacer);
    setJsonString(jsString);
    setShowModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowModal(false);
        setShowToast(false);
      }, 1000);
    });
  };

  const primaryHandsUsed = getHandsUsed(watchPrimaryWeapons || []);
  const secondaryHandsUsed = getHandsUsed(watchSecondaryWeapons || []);

  useEffect(() => {
    register("traitLine1", {
      validate: (value) =>
        value &&
        value.length === 3 &&
        value[0] != null &&
        value[1] != null &&
        value[2] != null &&
        value.every(Boolean)
          ? true
          : "Please select all three traits for this line",
    });
    register("traitLine2", {
      validate: (value) =>
        value &&
        value.length === 3 &&
        value[0] != null &&
        value[1] != null &&
        value[2] != null &&
        value.every(Boolean)
          ? true
          : "Please select all three traits for this line",
    });
    register("traitLine3", {
      validate: (value) =>
        value &&
        value.length === 3 &&
        value[0] != null &&
        value[1] != null &&
        value[2] != null &&
        value.every(Boolean)
          ? true
          : "Please select all three traits for this line",
    });
  }, [register]);

  const renderWeapons = <T extends "primaryWeapons" | "secondaryWeapons">(
    weapons: UseFieldArrayReturn<Build, T, "id">,
    fieldName: T,
    handsUsed: number
  ) => {
    return (
      <>
        {weapons.fields.map((field, index) => (
          <Col key={field.id}>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label>Weapon {index + 1}</Form.Label>

                  <Form.Select
                    defaultValue={""}
                    {...register(`${fieldName}.${index}.type`, {
                      required:
                        "Empty weapon slots not currently supported. Please either remove this weapon or set a weapon type.",
                    })}
                  >
                    <option hidden disabled value="">
                      Select Weapon Type
                    </option>
                    {BuildsUtil.getWeapons().map((weapon) => (
                      <option key={weapon.type} value={weapon.type}>
                        {weapon.type}
                      </option>
                    ))}
                  </Form.Select>
                  {errors?.[fieldName]?.[index]?.type && (
                    <Alert variant="danger">
                      {errors[fieldName]?.[index]?.type?.message}
                    </Alert>
                  )}
                  <Form.Select
                    defaultValue={""}
                    {...register(`${fieldName}.${index}.stat`, {
                      required: "Please select a weapon stat",
                    })}
                  >
                    <option hidden disabled value="">
                      Select Stat
                    </option>
                    {BuildsUtil.getWeaponStats().map((stat) => (
                      <option key={stat} value={stat}>
                        {stat}
                      </option>
                    ))}
                  </Form.Select>
                  {errors?.[fieldName]?.[index]?.stat && (
                    <Alert variant="danger">
                      {errors[fieldName]?.[index]?.stat?.message}
                    </Alert>
                  )}
                </Col>
                <Col>
                  <Form.Label>Sigils</Form.Label>
                  <Form.Control
                    type="number"
                    {...register(`${fieldName}.${index}.sigils.0`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Sigil 1 ID"
                  />
                  {weapons.fields.length == 1 && handsUsed == 2 && (
                    <Form.Control
                      type="number"
                      {...register(`${fieldName}.${index}.sigils.1`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Sigil 2 ID"
                    />
                  )}
                </Col>
              </Row>
              {weapons.fields.length > 1 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => weapons.remove(index)}
                >
                  Remove Weapon
                </Button>
              )}
            </Form.Group>
          </Col>
        ))}
        <p>
          <strong>Hands used:</strong> {handsUsed}/2
        </p>

        {handsUsed < 2 && weapons.fields.length < 2 && (
          <Button
            variant="secondary"
            onClick={() => {
              weapons.append({
                type: "",
                stat: "",
                sigils: [],
              } as any);
            }}
          >
            Add Weapon
          </Button>
        )}
      </>
    );
  };

  return (
    <Container style={{ paddingTop: 50, color: "white" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Label>Profession</Form.Label>
                  <Form.Select
                    {...register("class", {
                      required: "Please select a profession",
                    })}
                    onChange={handleProfessionSelected}
                    defaultValue={""}
                  >
                    <option hidden disabled value="">
                      Select Profession
                    </option>
                    {professions.map((profession, index) => (
                      <option key={index} value={profession}>
                        {profession}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.class && (
                    <Alert variant="danger">{errors.class.message}</Alert>
                  )}
                </Col>
                <Col>
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select
                    value={watch("spec")}
                    {...register("spec", {
                      required: "Please select a specialization",
                    })}
                  >
                    <option hidden disabled value="">
                      Select Specialization
                    </option>
                    {specs.map((spec, index) => (
                      <option key={index} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.spec && (
                    <Alert variant="danger">{errors.spec.message}</Alert>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Damage Type</Form.Label>
                  <Form.Select {...register("dmgType")}>
                    <option value={"Power"}>Power</option>
                    <option value={"Condition"}>Condition</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Squad Role</Form.Label>
                  <Form.Select {...register("role")}>
                    <option value={"DPS"}>DPS</option>
                    <option value={"BoonDPS"}>Boon DPS</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Boon</Form.Label>
                  <Form.Select {...register("boon")}>
                    <option value={"none"}>None</option>
                    <option value={"Quickness"}>Quickness</option>
                    <option value={"Alacrity"}>Alacrity</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} {...register("notes")} />
                </Col>
                <Col>
                  <Form.Label>Variations</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("variations")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("instructions")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>DPS Report Link</Form.Label>
                  <Form.Control {...register("dpsReportLink")} />
                </Col>
                <Col>
                  <Form.Label>Build Template</Form.Label>
                  <Form.Control {...register("buildTemplate")} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Label>Primary Weapon Set</Form.Label>
                </Col>
                <Col>
                  <Form.Check
                    reverse
                    type="switch"
                    label="Enable Second Weapon Set"
                    checked={showSecondary}
                    onChange={() => setShowSecondary(!showSecondary)}
                  />
                </Col>
              </Row>
              <Row>
                {renderWeapons(
                  primaryWeapons,
                  "primaryWeapons",
                  primaryHandsUsed
                )}
                {showSecondary && (
                  <>
                    <Row>
                      <Form.Label>Secondary Weapon Set</Form.Label>
                    </Row>
                    {renderWeapons(
                      secondaryWeapons,
                      "secondaryWeapons",
                      secondaryHandsUsed
                    )}
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Label>Armour</Form.Label>
                  <Form.Group>
                    <Form.Label>
                      <strong>Set All Armour</strong>
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Select
                        defaultValue={""}
                        onChange={(e) => handleSetAllArmorStat(e.target.value)}
                      >
                        <option hidden disabled value="">
                          Select Stat
                        </option>
                        {BuildsUtil.getArmourStats().map((stat: string) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control
                        type="number"
                        placeholder="Rune ID"
                        onBlur={(e) => {
                          const runeId = parseInt(e.target.value);
                          if (!isNaN(runeId)) {
                            handleSetAllArmorRune(runeId);
                          }
                        }}
                      />
                    </div>
                  </Form.Group>
                  {armourParts.map((part, index) => (
                    <div key={index}>
                      <Form.Label>{part}</Form.Label>
                      <Form.Select
                        defaultValue={""}
                        {...register(`gear.${index}.stat`, {
                          required: "Please select an armour stat",
                        })}
                      >
                        <option hidden disabled value="">
                          Select Stat
                        </option>
                        {BuildsUtil.getArmourStats().map((stat: string) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.gear?.[index]?.stat && (
                        <Alert variant="danger">
                          {errors.gear?.[index]?.stat?.message}
                        </Alert>
                      )}
                      <Form.Control
                        type="number"
                        placeholder="Rune ID"
                        {...register(`gear.${index}.rune`, {
                          valueAsNumber: true,
                        })}
                        className="mt-1"
                      />
                      <input
                        type="hidden"
                        value={part}
                        {...register(`gear.${index}.type`)}
                      />
                    </div>
                  ))}
                </Col>
                <Col>
                  <Form.Label>Relic</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("relic", {
                      valueAsNumber: true,
                      required: "Please enter a relic",
                    })}
                    placeholder="Relic ID"
                  />
                  {errors.relic?.message && (
                    <Alert variant="danger">{errors.relic.message}</Alert>
                  )}
                  <Form.Label>Accessories</Form.Label>
                  <Form.Group>
                    <Form.Label>
                      <strong>Set All Accessories</strong>
                    </Form.Label>
                    <Form.Select
                      defaultValue={""}
                      onChange={(e) => handleSetAllAccessories(e.target.value)}
                    >
                      <option hidden disabled value="">
                        Select Stat
                      </option>
                      {BuildsUtil.getAccessoryStats().map((stat: string) => (
                        <option key={stat} value={stat}>
                          {stat}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  {accessoryParts.map((item, index) => (
                    <div key={index}>
                      <Form.Label>{item}</Form.Label>
                      <Form.Select
                        defaultValue={""}
                        {...register(`accessories.${index}.stat`, {
                          required: "Please select an accessory stat",
                        })}
                      >
                        <option hidden disabled value="">
                          Select Stat
                        </option>
                        {BuildsUtil.getAccessoryStats().map((stat: string) => (
                          <option key={stat} value={stat}>
                            {stat}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.accessories?.[index]?.stat && (
                        <Alert variant="danger">
                          {errors.accessories?.[index]?.stat?.message}
                        </Alert>
                      )}
                      <input
                        type="hidden"
                        value={item}
                        {...register(`accessories.${index}.type`)}
                      />
                    </div>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              <Row>
                <Form.Label>Trait Lines</Form.Label>
                {[0, 1, 2].map((i) => (
                  <Col key={i}>
                    <Form.Group>
                      <Form.Select
                        value={watch(`traitLines.${i}`) || ""}
                        {...register(`traitLines.${i}`, {
                          setValueAs: (v) => Number(v),
                          required: "Please select a trait line",
                        })}
                      >
                        <option hidden disabled value="">
                          Select Trait Line
                        </option>
                        {traitLineOptions.map((trait) => (
                          <option key={trait.id} value={trait.id}>
                            {trait.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.traitLines?.[i] && (
                        <Alert variant="danger">
                          {errors.traitLines?.[i]?.message}
                        </Alert>
                      )}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Row>
                {traitLines?.[0] && (
                  <Row style={{ justifyContent: "center", padding: "15px" }}>
                    <TraitLine
                      style={{ maxWidth: "600px" }}
                      id={traitLines[0]}
                      selected={watch("traitLine1") || []}
                      onSelect={({ id, tier }) => {
                        const current = [...(watch("traitLine1") || [])];
                        current[tier] = id;
                        setValue("traitLine1", current, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors.traitLine1 && (
                      <Alert variant="danger">
                        {errors.traitLine1.message}
                      </Alert>
                    )}
                  </Row>
                )}
                {traitLines?.[1] && (
                  <Row style={{ justifyContent: "center", padding: "15px" }}>
                    <TraitLine
                      style={{ maxWidth: "600px" }}
                      id={traitLines[1]}
                      selected={watch("traitLine2") || []}
                      onSelect={({ id, tier }) => {
                        const current = [...(watch("traitLine2") || [])];
                        current[tier] = id;
                        setValue("traitLine2", current, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors.traitLine2 && (
                      <Alert variant="danger">
                        {errors.traitLine2.message}
                      </Alert>
                    )}
                  </Row>
                )}
                {traitLines?.[2] && (
                  <Row style={{ justifyContent: "center", padding: "15px" }}>
                    <TraitLine
                      style={{ maxWidth: "600px" }}
                      id={traitLines[2]}
                      selected={watch("traitLine3") || []}
                      onSelect={({ id, tier }) => {
                        const current = [...(watch("traitLine3") || [])];
                        current[tier] = id;
                        setValue("traitLine3", current, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {errors.traitLine3 && (
                      <Alert variant="danger">
                        {errors.traitLine3.message}
                      </Alert>
                    )}
                  </Row>
                )}
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "15px" }}>
            <Card.Body>
              {isRevenant ? (
                <Row>
                  <Col>
                    <Form.Label>Legend 1</Form.Label>
                    <Form.Select
                      defaultValue={""}
                      {...register("utilitySkills.0", {
                        required: isRevenant ? "Please select a legend" : false,
                      })}
                    >
                      <option hidden disabled value="">
                        Select Legend
                      </option>
                      {BuildsUtil.getRevenantLegends().map(
                        (legend: { id: number; name: string }) => (
                          <option key={legend.id} value={legend.id}>
                            {legend.name}
                          </option>
                        )
                      )}
                    </Form.Select>
                    {errors.utilitySkills?.[0]?.message && isRevenant && (
                      <Alert variant="danger">
                        {errors.utilitySkills[0].message}
                      </Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Legend 2</Form.Label>
                    <Form.Select
                      defaultValue={""}
                      {...register("utilitySkills.1", {
                        required: isRevenant ? "Please select a legend" : false,
                      })}
                    >
                      <option hidden disabled value="">
                        Select Legend
                      </option>
                      {BuildsUtil.getRevenantLegends().map(
                        (legend: { id: number; name: string }) => (
                          <option key={legend.id} value={legend.id}>
                            {legend.name}
                          </option>
                        )
                      )}
                    </Form.Select>
                    {errors.utilitySkills?.[1]?.message && isRevenant && (
                      <Alert variant="danger">
                        {errors.utilitySkills[1].message}
                      </Alert>
                    )}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Form.Label>Heal Skill</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("healSkill", {
                        valueAsNumber: true,
                        required: !isRevenant
                          ? "Empty skills are not currently supported. Please enter a skill ID and add alternatives to notes."
                          : false,
                      })}
                      placeholder="Heal Skill ID"
                    />
                    {errors.healSkill?.message && !isRevenant && (
                      <Alert variant="danger">{errors.healSkill.message}</Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Utility Skill 1</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("utilitySkills.0", {
                        valueAsNumber: true,
                        required: !isRevenant
                          ? "Empty skills are not currently supported. Please enter a skill ID and add alternatives to notes."
                          : false,
                      })}
                      placeholder="Utility Skill ID"
                    />
                    {errors.utilitySkills?.[0]?.message && !isRevenant && (
                      <Alert variant="danger">
                        {errors.utilitySkills[0].message}
                      </Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Utility Skill 2</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("utilitySkills.1", {
                        valueAsNumber: true,
                        required: !isRevenant
                          ? "Empty skills are not currently supported. Please enter a skill ID and add alternatives to notes."
                          : false,
                      })}
                      placeholder="Utility Skill ID"
                    />
                    {errors.utilitySkills?.[1]?.message && !isRevenant && (
                      <Alert variant="danger">
                        {errors.utilitySkills[1].message}
                      </Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Utility Skill 3</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("utilitySkills.2", {
                        valueAsNumber: true,
                        required: !isRevenant
                          ? "Empty skills are not currently supported. Please enter a skill ID and add alternatives to notes."
                          : false,
                      })}
                      placeholder="Utility Skill ID"
                    />
                    {errors.utilitySkills?.[2]?.message && !isRevenant && (
                      <Alert variant="danger">
                        {errors.utilitySkills[2].message}
                      </Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Label>Elite Skill</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("eliteSkill", {
                        valueAsNumber: true,
                        required: !isRevenant
                          ? "Empty skills are not currently supported. Please enter a skill ID and add alternatives to notes."
                          : false,
                      })}
                      placeholder="Elite Skill ID"
                    />
                    {errors.eliteSkill?.message && !isRevenant && (
                      <Alert variant="danger">
                        {errors.eliteSkill.message}
                      </Alert>
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Form.Group>
        <Button style={{ width: "100%" }} type="submit">
          Submit
        </Button>
      </Form>
      <Modal
        data-bs-theme="dark"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "white" }}>JSON Output</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows={8}
            value={jsonString}
            readOnly
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: "150px",
          zIndex: 2000,
        }}
        bg="success"
        autohide
        delay={1000}
      >
        <Toast.Body className="text-white text-center">Copied!</Toast.Body>
      </Toast>
    </Container>
  );
}

export default BuildBuilder;
