export const builds = [
    { id: 1, role:"DPS", dmgType: "Power", boon: "none",  class:"Elementalist", spec:"Tempest",
        notes: [],
        variations: ["Simple: Full Berserker  This will result in a loss of roughly 125dps",
                "Cheap: Full Berserker  Superior Rune of the Eagle ~ This will result in a loss of roughly 750dps"],
        healSkill: 21656,
        utilitySkills:[30662, 5734, 5542],
        eliteSkill: 5666,
        traitLines:[31, 41, 48],
        traitLine1:[296, 334, 1510],
        traitLine2:[232, 1502, 226],
        traitLine3:[1886, 1891, 1839],
        buildTemplate:"[&DQYfHSkfMBcnDycPwxJzAL4BUAHLAMsAJgCWAAAAAAAAAAAAAAAAAAAAAAACWgBnAAA=]",
        primaryWeapons:[{type:"Sword", stat:"Berserker", sigils:[24615]}, {type:"Warhorn", stat:"Berserker", sigils:[24618]}],
        secondaryWeapons:[],
        gear:[
            {type:"Helm", stat:"Berserker", rune:24836},
            {type:"Shoulders", stat:"Assassin", rune:24836},
            {type:"Coat", stat:"Berserker", rune:24836},
            {type:"Gloves", stat:"Berserker", rune:24836},
            {type:"Leggings", stat:"Berserker", rune:24836},
            {type:"Boots", stat:"Berserker", rune:24836}
        ],
        accessories:[
            {type:"Amulet", stat:"Berserker"},
            {type:"Ring", stat:"Assassin"},
            {type:"Ring", stat:"Berserker"},
            {type:"Accessory", stat:"Berserker"},
            {type:"Accessory", stat:"Berserker"},
            {type:"Back Item", stat:"Assassin"}
        ],
        relic:100947,
        dpsReportLink:"",
        instructions:[ "Start in Air and [29719] + [5737]",
        "Switch between Fire/Air off cooldown.",
        "In Fire, Use skills 2, 3,5,[30662] and [29706] off cooldown.",
        "In Air, Use skills 3, 5, [5737] and [29719] off cooldown.",
        "Use [5666] In fire preferably during downtime in combat or prior to the fight."]
    },
    { id: 2, role:"DPS", dmgType: "Power", boon: "none",  class:"Guardian", spec:"Dragonhunter",
        notes: ["You need at least 40% base crit chance (you will get +25% from fury, +25% from resolution because of Righteous Instincts, +10% from Radiant Power)",
            "Do NOT spend resources to make exotic Dragon’s gear"
        ],
        variations: [],
        healSkill: 9102,
        utilitySkills:[30364, 9168, 9093],
        eliteSkill: 30273,
        traitLines:[16, 42, 27],
        traitLine1:[566, 565, 1683],
        traitLine2:[634, 653, 2017],
        traitLine3:[1983, 1835, 1955],
        buildTemplate:"[&DQEQPio6GzoDAQAAihIAAEgBAAD+AAAAtRIAAAAAAAAAAAAAAAAAAAAAAAACMgAzAAA=]",
        primaryWeapons:[{type:"Greatsword", stat:"Berserker", sigils:[24615, 24868]}],
        secondaryWeapons:[],
        gear:[
            {type:"Helm", stat:"Berserker", rune:24836},
            {type:"Shoulders", stat:"Berserker", rune:24836},
            {type:"Coat", stat:"Berserker", rune:24836},
            {type:"Gloves", stat:"Berserker", rune:24836},
            {type:"Leggings", stat:"Berserker", rune:24836},
            {type:"Boots", stat:"Berserker", rune:24836}
        ],
        accessories:[
            {type:"Amulet", stat:"Berserker"},
            {type:"Ring", stat:"Berserker"},
            {type:"Ring", stat:"Berserker"},
            {type:"Accessory", stat:"Berserker"},
            {type:"Accessory", stat:"Berserker"},
            {type:"Back Item", stat:"Berserker"}
        ],
        relic:100947,
        dpsReportLink:"",
        instructions:["[9146] > [9081] is big damage.  Always use these utilitySkills together and in this order.  Wait for both to be off-cooldown if necessary.",
            "Use [30364], [9168] and [30273] off cooldown.",
            "Using the first cast of [9147] and [29887] will offer a damage multiplier to your utilitySkills. Only use the first cast."
        ]
    }
]