const editBtn = document.getElementById('edit-btn');
const editText = document.getElementById('edit-text');

// Add an event listener to the edit button
editBtn.addEventListener('click', function() {
  // When the button is clicked, set the input field to the button text
  editText.value = editBtn.innerText;

  // Change the button text to "Save"
  editBtn.innerText = "Save";

  // Add a new click event to the button that saves the changes
  editBtn.addEventListener('click', function() {
    // When the button is clicked, set the button text to the input field value
    editBtn.innerText = editText.value;

    // Change the button back to "Edit"
    editBtn.removeEventListener('click', null);
    editBtn.addEventListener('click', function() {
      editText.value = editBtn.innerText;
      editBtn.innerText = "Save";
    });
  });
});





