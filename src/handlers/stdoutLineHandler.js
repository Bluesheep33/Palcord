module.exports = (line) => {
    try {
        // Try to parse the line as JSON
        const obj = JSON.parse(line);

        // Log the object
        console.log(obj);

        // Log each attribute of the object
        for (const key in obj) {
            console.log(`${key}: ${obj[key]}`);
        }
    } catch (error) {
        // If an error is thrown, the line is not JSON, so just log the line
        console.log(line);
    }
}