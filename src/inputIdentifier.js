export function inputID(e) {
    let returnIndex;
    switch(e.target.id){
        case "innerinput1":
            returnIndex = 0;
            break;
        case "innerinput2":
            returnIndex = 1;
            break;
        case "innerinput3":
            returnIndex = 2;
            break;
        case "innerinput4":
            returnIndex = 3;
            break;
        case 'innerinput5':
            returnIndex = 4;
            break;
        case 'innerinput6':
            returnIndex = 5;
            break;
        case 'innerinput7':
            returnIndex = 6;
            break;
        case 'innerinput8':
            returnIndex = 7;
            break;
        case 'innerinput9':
            returnIndex = 8;
            break;
        case 'innerinput10':
            returnIndex = 9;
            break;
        case 'innerinput11':
            returnIndex = 10;
            break;
        case 'innerinput12':
            returnIndex = 11;
            break;
        case 'innerinput13':
            returnIndex = 12;
            break;
    }
    return returnIndex;
}