import { builds } from "../../assets/Builds";

export interface build {
    id:number;
    role:string;
    dmgType:string;
    boon:string;
    class:string;
    spec:string;
    recExpansions:string[];
    notes:string[];
    exoticGearLink:string;
    ascendedGearLink:string;
    buildTemplate:string;
    primaryWeapons:string[];
    secondaryWeapons:string[];
    runes:string;
    sigils:string[];
    relic:string;
    dpsReportLink:string;
    instructions:string[];
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
