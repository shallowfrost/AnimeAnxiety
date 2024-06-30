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

        return matrix;
    }

    function matrixToHtml(matrix) {
        let headers = matrix.shift(); // Remove the header row
        let container = document.createElement('div');

        matrix.forEach(row => {
            if (row[4].toLowerCase() === 'true') { // Check if the 5th column is true
                let card;
                if (row[1]) { // If there is a link
                    card = document.createElement('a');
                    card.href = row[1]; // Link URL
                    card.target = '_blank'; // Open in a new tab
                    card.className = 'link-card';
                } else {
                    card = document.createElement('div');
                    card.className = 'link-card no-link';
                }

                if (row[3]) { // Image link
                    let img = document.createElement('img');
                    img.src = row[3];
                    if (row[7]) img.style.height = row[7];
                    if (row[8]) img.style.width = row[8];
                    card.appendChild(img);
                }

                let content = document.createElement('div');
                content.className = 'content';

                if (row[5].toLowerCase() === 'true') { // Center text if 6th column is true
                    content.style.textAlign = 'center';
                }

                if (row[6] && window.innerWidth > 768) { // Add padding-left on larger screens based on 7th column
                    content.style.paddingLeft = `${row[6]}px`;
                }

                let title = document.createElement('h3');
                title.textContent = row[0];
                content.appendChild(title);

                let description = document.createElement('p');
                description.textContent = row[2];
                content.appendChild(description);

                card.appendChild(content);
                container.appendChild(card);
            }
        });

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

                // Append the content to the specified parent element
                document.getElementById(parentElementID).appendChild(content);
            })
            .catch(error => {
                console.error('Error fetching CSV:', error);
            });
    }

    // Load data from your Google Sheets
    loadPageContent('1440147431', 'linksContainer'); // Adjust sheet ID and parent element ID as needed
});
