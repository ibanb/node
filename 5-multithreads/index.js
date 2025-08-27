const { performance, PerformanceObserver } = require('perf_hooks')
const { Worker } = require('worker_threads')
const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    })
})

performanceObserver.observe({entryTypes: ['measure']})

const computeLinearPerf = () => {
    return new Promise((resolve, reject) => {

        const result = [];

        performance.mark('simple compute start')
        
        for(let i = 1; i <= 300000000; i++) {
            if( i % 3 === 0 ) {
                result.push(i)
            }
        }
        
        performance.mark('simple compute end')
        performance.measure('compute simple', 'simple compute start', 'simple compute end')

        resolve(result.length)
    })
}

const computeMultiPerf = () => {
    return new Promise((resolve, reject) => {
        // подготавливаем данные для вычислений
        const cores = 8
        const amount = 300000000;
        const separator = Math.floor(amount / cores)
        const reminder = amount % cores
        const intervals = []

        // создаём интервалы для выполнения в разных потоках
        for (let i = 0; i < cores; i++) {
            const start = i === 0 ? i * separator : i * separator + 1;
            const end = i === cores - 1 ? i * separator + separator + reminder : i * separator + separator;
            intervals.push({start, end})
        }

        // Создаем массив промисов для каждого worker'а
        const workerPromises = intervals.map(interval => {
            return new Promise((resolveWorker) => {
                performance.mark('multi compute start')
                const worker = new Worker('./5-multithreads/worker.js', {
                    workerData: interval
                })

                worker.on('message', (msg) => {
                    performance.mark('multi compute end');
                    performance.measure('compute worker', 'multi compute start', 'multi compute end');
                    resolveWorker(msg); // Разрешаем промис с результатом
                });

                worker.on('error', (err) => {
                    reject(err);
                });
            });
        });

        // Ждем завершения всех worker'ов
        Promise.all(workerPromises)
            .then(results => {
                resolve(results); // Разрешаем основной промис с массивом результатов
            })
            .catch(reject);
    })
}

const main = async () => {
    try {
        const linearResult = await computeLinearPerf();
        console.log(`простые вычисления дают - ${linearResult}`)
        const multiResult = await computeMultiPerf();
        console.log(`сложные вычисления дают - ${multiResult.reduce((acc, current) => acc + current, 0)}`)
        console.log(multiResult)
    } catch(e) {
        console.log(e)
    }
}

main();