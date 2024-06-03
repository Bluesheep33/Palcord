module.exports = (line) => {
    try {
        // Try to parse the line as JSON
        const obj = JSON.parse(line);

        // Log the object
        console.log(obj);
    } catch (error) {
        // If an error is thrown, the line is not JSON, so just log the line
        console.log(line);
    }
}