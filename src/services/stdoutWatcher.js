const fs = require('fs');
const readline = require('readline');
const stdoutHandler = require('../handlers/stdoutHandler');

module.exports = () => {
    let lineCount = 0;
    const logPath = '~/Steam/steamapps/common/PalServer/console-log.txt';

    const rl = readline.createInterface({
        input: fs.createReadStream(logPath),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', () => {
        lineCount++;
    });

    fs.watchFile(logPath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            const newRl = readline.createInterface({
                input: fs.createReadStream(logPath),
                output: process.stdout,
                terminal: false
            });

            let newLines = 0;

            newRl.on('line', (line) => {
                newLines++;
                if (newLines > lineCount) {
                    stdoutHandler(line);
                }
            });

            lineCount = newLines;
        }
    });
}