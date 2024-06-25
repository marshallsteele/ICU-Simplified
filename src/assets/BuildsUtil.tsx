import { build } from "../components/Helpers/BuildHelper"

var HoTSpecs = {
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

class BuildsUtil {
    private static checkExpansionRequired(expansionSpecs:any, build:build) {
        var eliteSpec = expansionSpecs[build.class];
        if (build.spec === eliteSpec.name) return true;
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === eliteSpec.mainWeapon)
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === eliteSpec.mainWeapon)
            || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === eliteSpec.offWeapon)
            || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === eliteSpec.offWeapon)) return true;
    }

    private static checkHoTRequired(build:build) {
        return this.checkExpansionRequired(HoTSpecs, build);
    }

    private static checkPoFRequired(build:build) {
        return this.checkExpansionRequired(PoFSpecs, build);
    }

    private static checkEoDRequired(build:build) {
        return this.checkExpansionRequired(EoDSpecs, build);
    }

    private static checkSotORequired(build:build) {
        var weapons = (SotOWeapons as any)[build.class];
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === weapons[0])
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === weapons[0])
            || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === weapons[1])
            || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === weapons[1])) return true;

    }

    public static getRequiredExpansions(build:build) {
        var requiredExpansions = [];
        if (this.checkHoTRequired(build)) requiredExpansions.push("HoT");
        if (this.checkPoFRequired(build)) requiredExpansions.push("PoF");
        if (this.checkEoDRequired(build)) requiredExpansions.push("EoD");
        if (this.checkSotORequired(build)) requiredExpansions.push("SotO");
        return requiredExpansions;
    }
}

export default BuildsUtil;