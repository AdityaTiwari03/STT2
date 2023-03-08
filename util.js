var waiting = true
var db = ''

// Load the JSON file
function loadData(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/db.json', true);
    console.log("Load data called")
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data)
            db = data
            waiting = false
        }
    };
    xhr.send();
}
function saveData(){
    console.log("Save data called")
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Data Saved")
        }
    }
    xhr.send(db);
}
