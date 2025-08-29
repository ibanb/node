
module.exports = computeMulti = (wd) => {
    const result = [];


    // console.log(wd.start)
    for (let i = wd.start; i < wd.end; i++) {

        if ( i % 3 === 0) {
            result.push(i)
        }

    }
    
    return result.length
}