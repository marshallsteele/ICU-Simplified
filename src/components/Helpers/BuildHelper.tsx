import { builds } from "../../assets/Builds";

export interface build {
    role:string;
    dmgType:string;
    boon:string;
    class:string;
    spec:string;
    notes:string[];
    variations:string[];
    healSkill:number;
    utilitySkills:number[];
    eliteSkill:number;
    traitLines:number[];
    traitLine1:number[],
    traitLine2:number[],
    traitLine3:number[],
    buildTemplate:string;
    primaryWeapons:weapon[];
    secondaryWeapons:weapon[];
    gear:armour[];
    accessories:accessory[];
    relic:number;
    dpsReportLink:string;
    instructions:string[];
}

export interface weapon {
    type:string;
    stat:string;
    sigils:number[];
}

export interface armour {
    type:string;
    stat:string;
    rune:number;
}

export interface accessory {
    type: string;
    stat:string;
}

export function getAllBuilds() {
    return builds;
}

export function getAllDPSBuilds() {
    return builds.filter(x => x.role == "DPS");
}

export function getAllPowerDPSBuilds() {
    return builds.filter(x => x.role == "DPS" && x.dmgType == "Power");
}

export function getAllConditionDPSBuilds() {
    return builds.filter(x => x.role == "DPS" && x.dmgType == "Condition");
}

export function getAllBoonDPSBuilds() {
    return builds.filter(x => x.role == "BoonDPS");
}

export function getAllAlacrityDPSBuilds() {
    return builds.filter(x => x.role == "BoonDPS" && x.boon == "Alacrity");
}

export function getAllQuicknessDPSBuilds() {
    return builds.filter(x => x.role == "BoonDPS" && x.boon == "Quickness");
}

export function getAllClassBuilds(className:string) {
    return builds.filter(x => x.class == className);
}
