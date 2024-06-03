const path = require('path');
const fs = require('fs');
const readline = require('readline');
const stdoutLineHandler = require('../handlers/stdoutLineHandler');
const { logPath } = require('../../config.json');

let lastLineRead;

const lastLineReadPath = path.join(__dirname, './stdoutService', 'lastLineRead');

// Read the lastLineRead value from the file
if (fs.existsSync(lastLineReadPath)) {
    lastLineRead = Number(fs.readFileSync(lastLineReadPath, 'utf8'));
} else {
    lastLineRead = 0;
}

const readLogFile = () => {
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
            // Close the readline interface
            rl.close();

            // Stop watching the file
            fs.unwatchFile(logPath);

            // Write the lastLineRead value to the file
            fs.writeFileSync(lastLineReadPath, lastLineRead.toString(), 'utf8');

            // Restart the method
            readLogFile();
        }
    });
}

// Export the method
module.exports = readLogFile;