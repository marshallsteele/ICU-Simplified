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
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === weapons[0])
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === weapons[0])
            || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === weapons[1])
            || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === weapons[1])) return true;
        
        //Check Weapon Master Training
        var eliteSpec = (HoTSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === eliteSpec.offWeapon)) return true;
        }
        eliteSpec = (PoFSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === eliteSpec.offWeapon)) return true;
        }
        eliteSpec = (EoDSpecs as any)[build.class];
        if (build.spec !== eliteSpec.name) {
            if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === eliteSpec.mainWeapon)
                || (build.primaryWeapons.length > 1 && build.primaryWeapons[1] === eliteSpec.offWeapon)
                || (build.secondaryWeapons.length > 1 && build.secondaryWeapons[1] === eliteSpec.offWeapon)) return true;
        }
    }

    private static checkJWRequired(build:build) {
        if ((build.primaryWeapons.length > 0 && build.primaryWeapons[0] === JWWeapon)
            || (build.secondaryWeapons.length > 0 && build.secondaryWeapons[0] === JWWeapon)) return true;
    }

    public static getRequiredExpansions(build:build) {
        var requiredExpansions = [];
        console.log(build);
        if (this.checkHoTRequired(build)) requiredExpansions.push("HoT");
        if (this.checkPoFRequired(build)) requiredExpansions.push("PoF");
        if (this.checkEoDRequired(build)) requiredExpansions.push("EoD");
        if (this.checkSotORequired(build)) requiredExpansions.push("SotO");
        if (this.checkJWRequired(build)) requiredExpansions.push("JW");
        console.log(requiredExpansions);
        return requiredExpansions;
    }
}

export default BuildsUtil;