const fs = require('fs');
const readline = require('readline');
const stdoutHandler = require('../handlers/stdoutHandler');
const { logPath } = require('../../config.json');

module.exports = () => {
    let lastLineRead = 0;

    fs.watchFile(logPath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            let lineCount = 0;

            const rl = readline.createInterface({
                input: fs.createReadStream(logPath),
                terminal: false
            });

            rl.on('line', (line) => {
                lineCount++;
                if (lineCount > lastLineRead) {
                    stdoutHandler(line);
                }
            });

            rl.on('close', () => {
                lastLineRead = lineCount;
            });
        }
    });
}