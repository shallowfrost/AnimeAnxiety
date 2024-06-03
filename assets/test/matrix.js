document.addEventListener('DOMContentLoaded', () => {
    function csvToMatrix(csvString) {
        let rows = csvString.trim().split('\n').filter(row => row.trim() !== '');
        let matrix = [];
        for (let row of rows) {
            let cells = [];
            let inQuotes = false;
            let cell = '';
            for (let char of row) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    cells.push(cell.trim());
                    cell = '';
                } else {
                    cell += char;
                }
            }
            cells.push(cell.trim());
            matrix.push(cells);
        }

        // Remove empty columns
        let maxRowLength = matrix.reduce((max, row) => Math.max(max, row.length), 0);
        let columnNotEmpty = Array(maxRowLength).fill(false);
        matrix.forEach(row => {
            row.forEach((cell, index) => {
                if (cell.trim()) columnNotEmpty[index] = true;
            });
        });
        matrix = matrix.map(row => row.filter((cell, index) => columnNotEmpty[index]));

        // Add an empty row at the end
        if (matrix.length > 0) {
            let headers = matrix.shift();
            matrix.unshift(headers);
            let newRow = Array(headers.length).fill('');
            matrix.push(newRow);
        } else {
            console.log('No data available.');
        }

        return matrix;
    }

    function matrixToHtml(matrix) {
        let htmlString = '';

        matrix.forEach(row => {
            row.forEach(cell => {
                htmlString += cell;
            });
        });

        let container = document.createElement('div');
        container.innerHTML = htmlString;

        return container;
    }

    function loadPageContent(sheetID, parentElementID) {
        const spreadSheetID = '1c2LVY3M4CwtR0AYsdukq8V1mPiN5rLNVWo8MOUNR1Ds';
        const spreadSheetUrl = `https://docs.google.com/spreadsheets/d/${spreadSheetID}/export?format=csv&gid=${sheetID}`;

        fetch(spreadSheetUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(csvData => {
                let matrix = csvToMatrix(csvData);
                let content = matrixToHtml(matrix);
                document.getElementById(parentElementID).appendChild(content);
                console.log(content);
            })
            .catch(error => {
                console.error('Error fetching CSV:', error);
            });

    }

    loadPageContent('1440147431', 'homePageContent');
    loadPageContent('657760509', 'aboutPageContent');
});