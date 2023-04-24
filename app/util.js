var loaded = false
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
            loaded = true
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
    window.open("index.html")
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
        // console.log(db.books[i])
        if(db.books[i].name.search(searchTerm) != -1){
            filteredBooks.push(db.books[i])
        }
        else{
            secondPass.push(db.books[i])
        }
    }
    for(var i = 0; i < secondPass.length; i++){
        if(secondPass[i].author.search(searchTerm) != -1 || secondPass[i].description.search(searchTerm) != -1){
            filteredBooks.push(secondPass[i])
        }
    }

    bookList = document.getElementById("bookList")
    for(var i = 0; i < filteredBooks.length; i++){
        var bookDetails = filteredBooks[i]
        var bookElement = document.createElement('div')
        bookElement.innerHTML = `
        <div class="list-book-tile" >
        <div class="list-book-header">
        <div class="list-book-title">`+bookDetails.name+`</div>
        <div class="list-book-author">`+bookDetails.author+`</div>
        </div>
        <div class="list-book-description">`+bookDetails.description+`
           <div>
                <a href="/edit.html?book_id=`+ bookDetails.name +`">        
                   <button class = "buttonsearch1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                         <path fill="currentColor" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Z"/>
                     </svg>
                     </button>
                </a>
                <button class = "buttonsearch1" onclick = "deleteBook('`+bookDetails.name+`')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
                    </svg>
                </button>
            </div>
        </div>
        `
        bookList.appendChild(bookElement)
    }
}

async function getBook(name){
    while(!loaded){
        await sleep(i * 1000);
    }
    for(var i = 0; i < db.books.length; i++){
        if (db.books[i].name == name){
            return db.books[i]
        }
    }
}

function deleteBook(name){
    newBookList = []    
    for(var i = 0; i < db.books.length; i++){
        if (db.books[i].name != name){
            newBookList.push(db.books[i])
        }
    }
    db.books = newBookList
    saveData()
    window.open("index")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    console.log('Done');
}
