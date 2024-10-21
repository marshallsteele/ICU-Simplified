//Goal is to import all relevant items from the API. store them in json and return useful objects to other componnets on request, indexed by name or keyword

//https://medium.com/@xspaces2011/fetching-data-from-apis-in-react-js-d7bcac7f7637
//https://blog.logrocket.com/how-to-build-component-library-react-typescript/
//https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

import React, {useState, useEffect} from 'react';

//Rune id's need to be maintained, could scrape wiki but unreliable and also potentially outdated
//https://wiki.guildwars2.com/wiki/Rune
//Keep
const runeIds = [
    '89999', '76813', '24702', '24741', '24714', '24782', '24729', '24747', '24788', '36044', 
    '24797', '24854', '24800', '24836', '82791', '24756', '24703', '84749', '24803', '73399', 
    '70829', '72852', '71276', '24833', '83367', '24711', '82633', '24776', '24726', '24818',
    '24723', '24815', '76100', '73653', '24744', '24794', '24851', '24812', '24771', '24699',
    '24708', '67912', '24824', '49460', '68437', '24857', '67342', '24720', '24688', '24753',
    '24791', '24821', '24827', '44951', '24845', '83338', '67339', '24848', '24762', '24765',
    '24779', '44957', '72912', '24687', '44956', '83502', '71425', '83964', '24830', '24757',
    '84127', '24806', '24738', '48907', '47908', '24860', '24717', '24750', '67344', '74978',
    '24785', '84171', '38206', '24842', '24839', '24735', '24768', '83663', '70450', '24696',
    '81091', '24691', '70600', '76166', '83423', '24732', '69370', '88118', '85713'
];

const sigilIds = [
    '24618', '24615', '44944', '44950', '72339', '74326', '24612', '24624', '24630', '24627',
    '24632', '24583', '24621', '24636', '24639', '24645', '24664', '24654', '24684', '24661',
    '24675', '24809', '24648', '91339', '24651', '24672', '24678', '37912', '24658', '24681',
    '36053', '24655', '24667', '24868', '24642', '24572', '24571', '24567', '24555', '67343',
    '24554', '24548', '24570', '38294', '24561', '24562', '24551', '67913', '24560', '48911',
    '82876', '24591', '24589', '24592', '81045', '24578', '67341', '24584', '24582', '24575',
    '24580', '49457', '86170', '72092', '24601', '67340', '24609', '24607', '24605', '24597',
    '24599', '68436', '44947', '24600', '72872', '24865', '70825', '73532', '24594', '71130',
    '84505'
];

const relicIds = [
    '100432', '100390', '100074', '100942', '100455', '100442', '100614', '101116', '100947', '99997',
    '101268', '100625', '100461', '100115', '100429', '101198', '101191', '100177', '100794', '100148',
    '100561', '100693', '100849', '100388', '100527', '100542', '100385', '100450', '100448', '100345',
    '100924', '100934', '101166', '100090', '100453', '99965', '100153', '100219', '100048', '100230',
    '101139', '100158', '100031', '100580', '100579', '100752', '100739', '100368', '100400', '100916',
    '100411', '100694', '100144', '100659', '100194', '100557', '100893', '100775', '101737', '101801',
    '101863', '101767', '101943', '101955'
];

//need a list of relevant item ids. Can't just get them all and filter by upgrade components
const itemsAPIURL = 'https://api.guildwars2.com/v2/items';

const ItemsHelper = () => {
    // useStates for each type of item we're going to need lists of
    const [runes, setRunes] = useState([]);
    const [sigils, setSigils] = useState([]);
    const [relics, setRelics] = useState([]);

    //fetch items from api with fetch API
    useEffect(() => {
        var runeIdsFilter = "?ids=" + runeIds.toString();
        var sigilIdsFilter = "?ids=" + sigilIds.toString();
        var relicIdsFilter = "?ids=" + relicIds.toString();

        fetch(itemsAPIURL + runeIdsFilter)
        .then((response) => response.json())
        .then((data) => {
            setRunes(data)
            console.log(runes);
        })
        .catch((err) => {
            console.log(err.message);
        });

        fetch(itemsAPIURL + sigilIdsFilter)
        .then((response) => response.json())
        .then((data) => {
            setSigils(data)
            console.log(sigils);
        })
        .catch((err) => {
            console.log(err.message);
        });

        fetch(itemsAPIURL + relicIdsFilter)
        .then((response) => response.json())
        .then((data) => {
            setRelics(data)
            console.log(relics);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return null;
}

export default ItemsHelper;