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
