const spreadSheetID = '1c2LVY3M4CwtR0AYsdukq8V1mPiN5rLNVWo8MOUNR1Ds';
const spreadSheetUrl = `https://docs.google.com/spreadsheets/d/${spreadSheetID}/export?format=csv`;


function csvToMatrix(csvString) {
    let rows = csvString.trim().split('\n').filter(row => row.trim() !== '');
    let maxRowLength = rows.reduce((max, row) => Math.max(max, row.split(',').length), 0);
    let columnNotEmpty = Array(maxRowLength).fill(false);
    rows.forEach(row => {
        row.split(',').forEach((cell, index) => {
            if (cell.trim()) columnNotEmpty[index] = true;
        });
    });
    rows = rows.map(row => row.split(',').map(cell => cell.trim()).filter((cell, index) => columnNotEmpty[index] && cell !== ''));
    rows = rows.filter(row => row.some(cell => cell.trim() !== ''));
    if (rows.length === 0) {
        console.log('No data available.');
        return;
    }
    let headers = rows.shift();
    let matrix = [headers];
    rows.forEach(row => {
        matrix.push(row);
    });
    matrix.pop();
    let newRow = Array(headers.length).fill('');
    matrix.push(newRow);
    return matrix;
}

let matrix = csvToMatrix(csvString);
console.log(matrix);