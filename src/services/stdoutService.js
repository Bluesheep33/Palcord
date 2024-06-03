const fs = require('fs');
const readline = require('readline');
const stdoutLineHandler = require('../handlers/stdoutLineHandler');
const { logPath } = require('../../config.json');

let lastLineRead = 0;

module.exports = () => {
    // Create a readline interface to read the log file
    const rl = readline.createInterface({
        input: fs.createReadStream(logPath, { start: lastLineRead }),
        output: process.stdout,
        terminal: false
    });

    // Handle each line of the log file
    rl.on('line', (line) => {
        stdoutLineHandler(line);
        lastLineRead += Buffer.byteLength(line, 'utf8') + 1; // +1 for newline character
    });

    // Watch the log file for changes and restart the readline interface
    fs.watchFile(logPath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            rl.close();
            fs.unwatchFile(logPath);
            module.exports();
        }
    });
}