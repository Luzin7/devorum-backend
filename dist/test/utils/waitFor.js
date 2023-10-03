"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitFor = void 0;
async function waitFor(assertions, maxDuration = 1000) {
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
exports.waitFor = waitFor;
//# sourceMappingURL=waitFor.js.map