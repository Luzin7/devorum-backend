export async function waitFor(assertions, maxDuration = 1000) {
    return new Promise((resolve, reject) => {
        let elapsedTime = 0;
        const interval = setInterval(() => {
            elapsedTime += 10;
            try {
                assertions();
                clearInterval(interval);
                resolve();
            }
            catch (err) {
                if (elapsedTime >= maxDuration) {
                    reject(err);
                }
            }
        }, 10);
    });
}
//# sourceMappingURL=waitFor.js.map