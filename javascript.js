// Access external source through API to get response text as a string and turn it into json format ready to be further manipulated
// Create an asynchronous callback function to execute JSON.parse() method after readyState process is completed
function getData(url, callbackFunc) {
  var xhr = new XMLHttpRequest();

  // There are 5 state changes so the function is called 5 times before readyState reaches 4 and then response text is set to be accessed
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(JSON.parse(this.responseText)); // run this function as a callback in the getData func
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

// Create table header by iterating through object's keys and create <th> based on each key
function createTableHeader(obj) {
  let tableHeader = [];

  Object.keys(obj).forEach(key => {
    tableHeader.push(`<th>${key}</th>`);
  });
  return `<tr>${tableHeader}</tr>`;
}

// Generate pagination buttons
function createPageButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// Function to generate data table on button click
function writeToDocument(url) {
  let dataTable = document.getElementById("data");
  dataTable.innerHTML = ""; // clear current data table before generating a new one

  getData(url, data => {
    const dataArray = data.results;
    let tableHeader = createTableHeader(dataArray[0]);
    let tableRows = [];
    let pageButtons = "";
    
    dataArray.forEach(item => {
      let dataRow = [];

      Object.keys(item).forEach(key => {
        dataRow.push(`<td>${item[key]}</td>`);
        // Optional to truncate data
        // let truncatedData = item[key].toString().substring(0, 15);
        // dataRow.push(`<td>${truncatedData}</td>`);
      });

      tableRows.push(`<tr>${dataRow}</tr>`);
    });

    if (data.next || data.previous) {
        pageButtons = createPageButtons(data.next, data.previous);
    }

    dataTable.innerHTML = `<table>${tableHeader}${tableRows}</table>${pageButtons}`;
  });
}
