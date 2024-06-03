const spreadSheetID = '1c2LVY3M4CwtR0AYsdukq8V1mPiN5rLNVWo8MOUNR1Ds';
const spreadSheetUrl = `https://docs.google.com/spreadsheets/d/${spreadSheetID}/export?format=csv`;

function fetchTableData() {
    fetch(spreadSheetUrl)
        .then(response => response.text())
        .then(csvString => {
            let table = csvToTable(csvString);
            let tableContainer = document.getElementById('table-container');
            // Clear the container and append the new table
            while (tableContainer.firstChild) {
                tableContainer.removeChild(tableContainer.firstChild);
            }
            tableContainer.appendChild(table);
        }).catch(error => {
            console.error('Error fetching CSV:', error);
            document.getElementById('table-container').textContent = 'Error loading data.';
        });
}

function csvToTable(csvString) {
    let rows = csvString.trim().split('\n').filter(row => row.trim() !== '');

    // Determine non-empty columns
    let maxRowLength = rows.reduce((max, row) => Math.max(max, row.split(',').length), 0);
    let columnNotEmpty = Array(maxRowLength).fill(false);
    rows.forEach(row => {
        row.split(',').forEach((cell, index) => {
            if (cell.trim()) columnNotEmpty[index] = true;
        });
    });

    // Filter rows and columns
    rows = rows.map(row => row.split(',').map(cell => cell.trim()).filter((cell, index) => columnNotEmpty[index] && cell !== ''));

    // Removing completely empty rows after column filter
    rows = rows.filter(row => row.some(cell => cell.trim() !== ''));

    if (rows.length === 0) {
        let p = document.createElement('p');
        p.textContent = 'No data available.';
        return p;
    }

    let headers = rows.shift();
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    rows.forEach(row => {
        let tr = document.createElement('tr');
        row.forEach(column => {
            let td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    // Remove the last row
    table.deleteRow(-1);

    // Add a new empty row based on the header length
    let newRow = table.insertRow(-1);
    for (var i = 0; i < headers.length; i++) {
        newRow.insertCell(i);
    }

    return table;
}

fetchTableData();
