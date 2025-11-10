import { build } from "../components/Helpers/BuildHelper"

const specs = {
    'Guardian': ["Guardian", "Dragonhunter", "Firebrand", "Willbender"],
    'Revenant': ["Revenant", "Herald", "Renegade", "Vindicator"],
    'Warrior': ["Warrior", "Berserker", "Spellbreaker", "Bladesworn"],
    'Engineer': ["Engineer", "Scrapper", "Holosmith", "Mechanist"],
    'Ranger': ["Ranger", "Druid", "Soulbeast", "Untamed"],
    'Thief': ["Thief", "Daredevil", "Deadeye", "Specter"],
    'Elementalist': ["Elementalist", "Tempest", "Weaver", "Catalyst"],
    'Mesmer': ["Mesmer", "Chronomancer", "Mirage", "Virtuoso"],
    'Necromancer': ["Necromancer", "Reaper", "Scourge", "Harbinger"]
}

const revLegends = [
    { id: 1, name: "Jalis Ironhammer" },
    { id: 2, name: "Ventari" },
    { id: 3, name: "Shiro Tagachi" },
    { id: 4, name: "Mallyx the Unyielding" },
    { id: 5, name: "Glint" },
    { id: 6, name: "Kalla Scorchrazor" },
]

const weaponTypes = [
  { type: "Sword", hands: 1 },
  { type: "Dagger", hands: 1 },
  { type: "Axe", hands: 1 },
  { type: "Mace", hands: 1 },
  { type: "Pistol", hands: 1 },
  { type: "Scepter", hands: 1 },
  { type: "Focus", hands: 1 },
  { type: "Shield", hands: 1 },
  { type: "Torch", hands: 1 },
  { type: "Warhorn", hands: 1 },

  { type: "Greatsword", hands: 2 },
  { type: "Hammer", hands: 2 },
  { type: "Staff", hands: 2 },
  { type: "Longbow", hands: 2 },
  { type: "Shortbow", hands: 2 },
  { type: "Rifle", hands: 2 },
  { type: "Spear", hands:2 }
]

const weaponStats = [
  "Berserker",
  "Zealot",
  "Soldier",
  "Forsaken",
  "Valkyrie",
  "Harrier",
  "Commander",
  "Demolisher",
  "Marauder",
  "Vigilant",
  "Crusader",
  "Wanderer",
  "Diviner",
  "Dragon",
  "Viper",
  "Grieving",
  "Marshal",
  "Rampager",
  "Assassin",
  "Seraph",
  "Knight",
  "Cavalier",
  "Nomad",
  "Settler",
  "Giver",
  "Trailblazer",
  "Minstrel",
  "Sentinel",
  "Shaman",
  "Ritualist",
  "Plaguedoctor",
  "Sinister",
  "Carrion",
  "Rabid",
  "Dire",
  "Apostate",
  "Bringer",
  "Cleric",
  "Magi",
  "Apothecary",
  "Celestial"
]

const armourStats = [
  "Berserker",
  "Zealot",
  "Soldier",
  "Valkyrie",
  "Harrier",
  "Commander",
  "Demolisher",
  "Marauder",
  "Vigilant",
  "Crusader",
  "Wanderer",
  "Diviner",
  "Dragon",
  "Viper",
  "Grieving",
  "Marshal",
  "Rampager",
  "Assassin",
  "Seraph",
  "Knight",
  "Cavalier",
  "Nomad",
  "Settler",
  "Giver",
  "Trailblazer",
  "Minstrel",
  "Sentinel",
  "Shaman",
  "Ritualist",
  "Plaguedoctor",
  "Sinister",
  "Carrion",
  "Rabid",
  "Dire",
  "Bringer",
  "Cleric",
  "Magi",
  "Apothecary",
  "Celestial"
]

const accessoryStats = [
  "Berserker",
  "Zealot",
  "Soldier",
  "Valkyrie",
  "Harrier",
  "Commander",
  "Demolisher",
  "Marauder",
  "Vigilant",
  "Crusader",
  "Wanderer",
  "Diviner",
  "Dragon",
  "Viper",
  "Grieving",
  "Marshal",
  "Rampager",
  "Assassin",
  "Seraph",
  "Knight",
  "Cavalier",
  "Nomad",
  "Settler",
  "Giver",
  "Trailblazer",
  "Minstrel",
  "Sentinel",
  "Shaman",
  "Ritualist",
  "Plaguedoctor",
  "Sinister",
  "Carrion",
  "Rabid",
  "Dire",
  "Bringer",
  "Cleric",
  "Magi",
  "Apothecary",
  "Celestial"
]

const HoTSpecs = {
    'Guardian': {
        name:'Dragonhunter',
        mainWeapon:'Longbow',
        offWeapon:null
    },
    'Revenant': {
        name:'Herald',
        mainWeapon:null,
        offWeapon:'Shield'
    },
    'Warrior': {
        name:'Berserker',
        mainWeapon:null,
        offWeapon:'Torch'
    },
    'Engineer': {
        name:'Scrapper',
        mainWeapon:'Hammer',
        offWeapon:null
    }, 
    'Ranger': {
        name:'Druid',
        mainWeapon:'Staff',
        offWeapon:null
    }, 
    'Thief': {
        name:'Daredevil',
        mainWeapon:'Staff',
        offWeapon:null
    },
    'Elementalist': {
        name:'Tempest',
        mainWeapon:null,
        offWeapon:'Warhorn'
    },
    'Mesmer': {
        name:'Chronomancer',
        mainWeapon:null,
        offWeapon:'Shield'
    }, 
    'Necromancer': {
        name:'Reaper',
        mainWeapon:'Greatsword',
        offWeapon:null
    }
}

const PoFSpecs = {
    'Guardian': {
        name:'Firebrand',
        mainWeapon:'Axe',
        offWeapon:null
    },
    'Revenant': {
        name:'Renegade',
        mainWeapon:'Shortbow',
        offWeapon:null
    },
    'Warrior': {
        name:'Spellbreaker',
        mainWeapon:'Dagger',
        offWeapon:'Dagger'
    },
    'Engineer': {
        name:'Holosmith',
        mainWeapon:'Sword',
        offWeapon:null
    }, 
    'Ranger': {
        name:'Soulbeast',
        mainWeapon:'Dagger',
        offWeapon:null
    }, 
    'Thief': {
        name:'Deadeye',
        mainWeapon:'Rifle',
        offWeapon:null
    },
    'Elementalist': {
        name:'Weaver',
        mainWeapon:'Sword',
        offWeapon:null
    },
    'Mesmer': {
        name:'Mirage',
        mainWeapon:'Axe',
        offWeapon:null
    }, 
    'Necromancer': {
        name:'Scourge',
        mainWeapon:null,
        offWeapon:'Torch'
    }
}

const EoDSpecs = {
    'Guardian': {
        name:'Willbender',
        mainWeapon:null,
        offWeapon:'Sword'
    },
    'Revenant': {
        name:'Vindicator',
        mainWeapon:'Greatsword',
        offWeapon:null
    },
    'Warrior': {
        name:'Bladesworn',
        mainWeapon:null,
        offWeapon:'Pistol'
    },
    'Engineer': {
        name:'Mechanist',
        mainWeapon:'Mace',
        offWeapon:null
    }, 
    'Ranger': {
        name:'Untamed',
        mainWeapon:'Hammer',
        offWeapon:null
    }, 
    'Thief': {
        name:'Specter',
        mainWeapon:'Scepter',
        offWeapon:null
    },
    'Elementalist': {
        name:'Catalyst',
        mainWeapon:'Hammer',
        offWeapon:null
    },
    'Mesmer': {
        name:'Virtuoso',
        mainWeapon:'Dagger',
        offWeapon:null
    }, 
    'Necromancer': {
        name:'Harbinger',
        mainWeapon:'Pistol',
        offWeapon:null
    }
}

const SotOWeapons = {
    'Guardian': ['Pistol', 'Pistol'],
    'Revenant': ['Scepter', null],
    'Warrior': ['Staff', null],
    'Engineer': ['Shortbow', null], 
    'Ranger': ['Mace', 'Mace'], 
    'Thief': ['Axe', null],
    'Elementalist': ['Pistol', null],
    'Mesmer': ['Rifle', null], 
    'Necromancer': ['Sword', 'Sword']
}

const JWWeapon = "Spear"

class BuildsUtil {
    private static checkHoTRequired(build:build) {
        return build.spec === (HoTSpecs as any)[build.class].name;
    }

    private static checkPoFRequired(build:build) {
        return build.spec === (PoFSpecs as any)[build.class].name;
    }

    private static checkEoDRequired(build:build) {
        return build.spec === (EoDSpecs as any)[build.class].name;
    }

    private static checkSotORequired(build:build) {
        var weapons = (SotOWeapons as any)[build.class];
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0].type === weapons[0])
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0].type === weapons[0])
            || (build.primaryWeapons.length > 1 && build.primaryWeapons[1].type === weapons[1])
            || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1].type === weapons[1])) return true;
        
        //Check Weapon Master Training
        var eliteSpec = (HoTSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1].type === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1].type === eliteSpec.offWeapon)) return true;
        }
        eliteSpec = (PoFSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1].type === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1].type === eliteSpec.offWeapon)) return true;
        }
        eliteSpec = (EoDSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0].type === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1].type === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1].type === eliteSpec.offWeapon)) return true;
        }
    }

    private static checkJWRequired(build:build) {
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0].type === JWWeapon)
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0].type === JWWeapon)) return true;
    }

    public static getRequiredExpansions(build:build) {
        var requiredExpansions = [];
        if (this.checkHoTRequired(build)) requiredExpansions.push("HoT");
        if (this.checkPoFRequired(build)) requiredExpansions.push("PoF");
        if (this.checkEoDRequired(build)) requiredExpansions.push("EoD");
        if (this.checkSotORequired(build)) requiredExpansions.push("SotO");
        if (this.checkJWRequired(build)) requiredExpansions.push("JW");
        return requiredExpansions;
    }

    public static getSpecs(profession:string) {
        return (specs as any)[profession];
    }

    public static getWeapons() {
        return weaponTypes.sort((a, b) => (a.type > b.type ? 1 : -1));
    }

    public static getWeaponStats() {
        return weaponStats.sort();
    }

    public static getArmourStats() {
        return armourStats.sort();
    }

    public static getAccessoryStats() {
        return accessoryStats.sort();
    }

    public static getRevenantLegends() {
        return revLegends.sort();
    }
}

export default BuildsUtil;