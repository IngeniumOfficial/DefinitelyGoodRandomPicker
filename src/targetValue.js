export const targetValue = (arr) => {
    const wheelSize = arr.length;
    // depending on the wheel size, return the count of the targeted value
    if(wheelSize <= 4) {
        return 1;
    } else if (wheelSize > 4 && wheelSize <= 8) {
        return 2;
    } else if (wheelSize > 8 && wheelSize <= 12) {
        return 3;
    } else if (wheelSize > 12 && wheelSize <= 16) {
        return 4;
    } else if (wheelSize > 16 && wheelSize <= 20) {
        return 5;
    } else if (wheelSize > 20 && wheelSize <= 24) {
        return 6;
    } else if (wheelSize > 24 && wheelSize <= 28) {
        return 7;
    } else if (wheelSize > 28 && wheelSize <= 32) {
        return 8;
    } else if (wheelSize > 32 && wheelSize <= 36) {
        return 9;
    } else if (wheelSize > 36 && wheelSize <= 40) {
        return 10;
    }
}
