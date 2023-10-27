// This event listener ensures the DOM is fully loaded before running the script.
document.addEventListener('DOMContentLoaded', function() {
    
    // Declare and initialize DOM elements we'll interact with.
    const addButton = document.getElementById("enter");
    const inputField = document.getElementById("userinput");
    const shoppingList = document.getElementById("shoppingList");

    // Event listener for adding new items to the list.
    addButton.addEventListener("click", function() {

        // Check if the input field is not empty.
        if (inputField.value.trim()) {
            // Create a new list item.
            const newItem = document.createElement("li");
            // Set the inner content of the list item to the user's input and a delete button.
            newItem.innerHTML = `${inputField.value} <button class="delete">Eliminar</button>`;
            // Add the new item to the shopping list.
            shoppingList.appendChild(newItem);
            // Clear the input field.
            inputField.value = "";
            // Attach delete functionality to the delete button of the new list item.
            addDeleteEvent(newItem.querySelector(".delete"));
            // Attach a listener to the list item to toggle the 'done' class on click.
            newItem.addEventListener('click', toggleDoneStatus);
        }
    });

    // Event listener to handle deletion of items from the list.
    shoppingList.addEventListener('click', function(event) {
        // If the clicked element is a delete button, remove its parent (the list item).
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
        }
    });

    /**
     * Function: toggleDoneStatus
     * Description: Toggles the 'done' class of a list item.
     * @param {Event} event - The click event.
     */
    function toggleDoneStatus(event) {
        // Check if the clicked element is a list item.
        if (event.target.tagName === "LI") {
            const list = event.target.parentElement;
            const items = Array.from(list.children);
    
            // Toggle the 'done' class (for line-through effect).
            event.target.classList.toggle('done');
    
            if (event.target.classList.contains('done')) {
                // Move to the end visually using CSS order
                event.target.style.order = items.length;
            } else {
                // Move to the start visually using CSS order
                event.target.style.order = -1;
                items.forEach((item, index) => {
                    if (item !== event.target) {
                        item.style.order = index;
                    }
                });
            }
    
            // Wait for the CSS transition to complete, then update the DOM order
            setTimeout(() => {
                if (event.target.classList.contains('done')) {
                    list.appendChild(event.target);
                } else {
                    list.insertBefore(event.target, list.firstChild);
                }
                // Reset the CSS order property so it doesn't interfere with further interactions
                items.forEach(item => item.style.order = '');
            }, 500); // The timeout duration should match the transition duration in your CSS
        }
    }
    
    
    

    /**
     * Function: addDeleteEvent
     * Description: Attaches an event listener to a given button to delete its parent element (list item).
     * @param {HTMLElement} button - The delete button element.
     */
    function addDeleteEvent(button) {
        button.addEventListener('click', function() {
            // Remove the parent element (list item) of the button.
            button.parentElement.remove();
        });
    }

    // Attach delete event listeners to existing delete buttons on page load.
    const existingDeleteButtons = document.querySelectorAll(".delete");
    existingDeleteButtons.forEach(btn => addDeleteEvent(btn));

    // Attach click event listeners to existing list items on page load.
    const listItems = document.querySelectorAll("#shoppingList li");
    listItems.forEach(item => item.addEventListener('click', toggleDoneStatus));
});
