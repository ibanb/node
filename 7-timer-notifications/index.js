

const hours = process.argv[2];
const mins = process.argv[3];
const secs = process.argv[4];

function setTimer(h, m, s) {

    const totalTime = +h * 60 * 60 + +m * 60 + +s
    const timer = setTimeout(() => {
        console.log("ВРЕМЯ ВЫШЛО!")
    }, totalTime * 1000)

}

setTimer(hours, mins, secs)

// comment