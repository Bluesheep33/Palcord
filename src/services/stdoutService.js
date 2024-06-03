const fs = require('fs');
const readline = require('readline');
const stdoutLineHandler = require('../handlers/stdoutLineHandler');
const { logPath } = require('../../config.json');

module.exports = () => {
    // Create a readline interface to read the log file
    const rl = readline.createInterface({
        input: fs.createReadStream(logPath),
        output: process.stdout,
        terminal: false
    });

    // Handle each line of the log file
    rl.on('line', (line) => {
        stdoutLineHandler(line);
    });

    // Clear the log file when the readline interface is closed
    rl.on('close', () => {
        fs.writeFile(logPath, '', (err) => {
            if (err) { console.error(err); }
        });
    });

    // Watch the log file for changes and resume the readline interface
    fs.watchFile(logPath, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            rl.resume();
        }
    });
}