var bookID = ""
var myBook = {}
window.onload = function(){
    if((window.location.href).indexOf('?') != -1) {
        bookID = window.location.href.substring(window.location.href.indexOf("=")+1)
        bookID = decodeURI(bookID)
    }
    fillData()
}

async function fillData(){
    myBook = await getBook(bookID)
    document.getElementById("naam").value = myBook.name
    document.getElementById("author").value = myBook.author
    document.getElementById("isbn").value = myBook.isbn
    document.getElementById("des").value = myBook.description

}
myBook =  getBook(bookID)  
 function applyname(){                                              
    (myBook.name) =  document.getElementById("naam").value;
    console.log(myBook)
    saveData()
}
function applyauthor(){
    myBook.author = document.getElementById("author").value;
}
function applyisbn(){   
     myBook.isbn = document.getElementById("isbn").value;
}
function applydes(){
    yBook.description = document.getElementById("description").value;
}
