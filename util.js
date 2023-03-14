var waiting = true
var db = {"books": []}
loadData()

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
    xhr.send(JSON.stringify(db));
}
function addBook(){
    console.log("Book added")
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var isbn = document.getElementById("isbn").value;
    var description = document.getElementById("description").value;
    newBook = {
        "name" : name,
        "author" : author,
        "isbn" : isbn,
        "description" : description
    }
    db.books.push(newBook)
    saveData()
}
function search(){
    console.log("Search function called")
    // Change page mode
    // Remove title text and replace it with search box
    titleContainer = document.getElementsByTagName("header")[0]
    titleContainer.children[0].style.display = "none"

    searchContainer = document.getElementsByClassName("search-container")[0]
    titleContainer.appendChild(searchContainer)

    mainContainer = document.getElementById("content")
    mainContainer = document.getElementById("content")
    mainContainer.innerHTML = `
      <div id="bookList">
      </div>
        `
    // Get the search string
    searchTerm = document.getElementsByClassName("search-box")[0].value
    console.log(searchTerm)

    // Filter books
    filteredBooks = []
    secondPass = []
    for(var i = 0; i < db.books.length; i++){
        console.log(db.books[i])
        if(db.books[i].name.search(searchTerm) != -1){
            filteredBooks.push(db.books[i])
        }
        else{
            secondPass.push(db.books[i])
        }
    }
    for(var i = 0; i < secondPass.length; i++){
        console.log(secondPass[i])
        if(secondPass[i].author.search(searchTerm) != -1 || secondPass[i].description.search(searchTerm) != -1){
            filteredBooks.push(secondPass[i])
        }
    }

    bookList = document.getElementById("bookList")
    for(var i = 0; i < filteredBooks.length; i++){
        var bookDetails = filteredBooks[i]
        var bookElement = document.createElement('div')
        bookElement.innerHTML = `
            <div class="list-book-tile" onclick="editDetails(`+i+`)">
                <div class="list-book-header">
                    <div class="list-book-title">`+bookDetails.name+`</div>
                    <div class="list-book-author">`+bookDetails.author+`</div>
                </div>
                <div class="list-book-description">`+bookDetails.description+`</div>
            </div>
        `
        bookList.appendChild(bookElement)
    }
}
