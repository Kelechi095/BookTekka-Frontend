export const capitalizeFirst = (arg) => {
    return arg.split('').map((letter, index) => {
        if(index === 0) {
            return letter.toUpperCase()
        } else {
            return letter.toLowerCase()
        }
    }).join("")
}
