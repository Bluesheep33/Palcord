const path = require('path');
const fs = require('fs');
const readline = require('readline');
const serverLogLineHandler = require('../handlers/serverLogLineHandler');
const logPath = path.join(__dirname, '../../logs', 'server.log');
const lastLineReadPath = path.join(__dirname, '../../state', 'serverLogLastLineRead');

let lastLineRead;

// Read the lastLineRead value from the file
if (fs.existsSync(lastLineReadPath)) {
    lastLineRead = Number(fs.readFileSync(lastLineReadPath, 'utf8'));
} else {
    lastLineRead = 0;
}

// Create the log file if it doesn't exist
if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, '', 'utf8');
}

const readLogFile = (client) => {
    const fileSize = fs.statSync(logPath).size;

    // Check if the current file size is equal to or smaller than the lastLineRead value
    if (fileSize <= lastLineRead) {
        // No new lines to process, watch the log file for changes
        fs.watchFile(logPath, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
                // Stop watching the file
                fs.unwatchFile(logPath);

                // Restart the method
                readLogFile();
            }
        });
        return;
    }

    // Create a readline interface to read the log file
    const rl = readline.createInterface({
        input: fs.createReadStream(logPath, { start: lastLineRead }),
        output: process.stdout,
        terminal: false
    });

    // Handle each line of the log file
    rl.on('line', (line) => {
        serverLogLineHandler(client, line);
        lastLineRead += Buffer.byteLength(line + '\n', 'utf8');

        // Write the updated lastLineRead value to the file
        fs.writeFileSync(lastLineReadPath, lastLineRead.toString(), 'utf8');
    });

    rl.on('close', () => {
        // Watch the log file for changes and restart the readline interface
        fs.watchFile(logPath, (curr, prev) => {
            if (curr.mtime !== prev.mtime) {
                // Stop watching the file
                fs.unwatchFile(logPath);

                // Restart the method
                readLogFile(client);
            }
        });
    });
}

// Export the method
module.exports = (client) => readLogFile(client);