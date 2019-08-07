// Global data.
// A few todos in there to start with!
// This is mostly for testing purposes.
// let todos = [
//   `Be able to mark todos "done".`,
//   `Allow user interaction through the DOM`,
//   `Add dates to todos.`,
// ];

// let completed = [
//   false,
//   false,
//   false,
// ]

// Or the ALTERNATE method:
let todos = [];

//Write a function to print a given todo to the dom. You've done this before!

function printTodo(todo) {
  // Use `document.createElement` to make an li
  const myLi = document.createElement("li");
  myLi.innerText = todo;

  // Put the ul that's already in our html file in a variable.
  // const ulContainer = document.querySelector(".todo-list");
  // Append the li we made to the ul as the last child.
  // ulContainer.appendChild(myLi);

  let ol = document.querySelector(".todo-list");
  ol.insertBefore(myLi, ol.childNodes[0]);
}
//Write a function to print every todo individually, using the function you just made
function printAllToDo(ar) {
  ar.forEach(todo => {
    printTodo(todo[0]);
  });
}
//Now that you've written them, call your list-printing function, maybe up there right after your arrays. If you did it right, on load your page should list the todos we started with!

// Write a little helper function that adds a todo to your array(s).You'll need to push into both arrays if you're going with a dual - array setup, or push in a sub - array, depending on your setup.

function addToDoIntoArray(item) {
  let internalArray = [item];
  todos.unshift(internalArray);
}

//Write the equivalent helper function to * remove * one item from the array(s).

function removeToDoInAray(index) {
  todos.splice(index, 1);
}

//Now let's write a function to add to our list, complete with an event listener to run it when our add function is run. Grab the user's input and add it to your data and to the dom!

function addToDomAndArray() {
  const addToDoInputBox = document.querySelector(".todo-input");
  const toDoText = addToDoInputBox.value;
  addToDoIntoArray(toDoText);
  printTodo(toDoText);
  addToDoInputBox.value = "";
}

const addButton = document.querySelector(".add-todo");
addButton.onclick = addToDomAndArray;

//Let's write some new helper functions for our mark complete feature. The first takes in a number and marks the matching todo complete in our data.

function markCompleted(num) {
  if (!todos[num - 1][1]) {
    todos[num - 1].push(true);
  }
}

//Now write a helper function that, given a number, marks the equivalent`li` complete.I recommend a line through the text, but apply any other or additional css you want.There area few ways to use the number you're given to find the `li` you want to mark; I recommend an `nth-child()` selector.

function lineThroughItem(num) {
  let ol = document.querySelector(".todo-list");
  const children = ol.childNodes;
  children[num - 1].style.textDecoration = "line-through";
}

const markCompleteButton = document.querySelector(".mark-todo-complete");
markCompleteButton.onclick = completeIt;

//Given those helper functions(and try using them in the console to see if they work!), let's write our user-facing function for marking complete. It should run whenever the user hits the MARK COMPLETE function (so... an event listener!), and the function should grab the user's input and pass it to your two helper functions.Don't forget to adjust for index vs number, as our data is 0-based, but we should no longer expect our users to think that way!

function completeIt() {
  const numBox = document.querySelector(".number-input");

  markCompleted(numBox.value);
  lineThroughItem(numBox.value);
  numBox.value = "";
}

//Last major part: deleting * all todos * that are marked complete.But first, let's write a helper function to delete all `li`s from the DOM.
function clearDom() {
  let olContainerr = document.querySelector(".todo-list");
  while (olContainerr.firstChild) {
    olContainerr.removeChild(olContainerr.firstChild);
  }
}

//Now the function: it should run every time the DELETE COMPLETED button is pushed, and it should go through and find those marked completed and delete them from the array (don't worry about the dom yet!). You can build a new set of data that doesn't have the completed ones, or splice the current set of data, but both are tricky! When your data is only incomplete todos, run your dom-list-clearing function and your list-printing function, and this big ol' function is all done!
const deleteButton = document.querySelector(".delete-completed-todos");
deleteButton.onclick = deletefromArray;
function deletefromArray() {
  let newarr = [];
  todos.forEach(todo => {
    if (!todo[1]) {
      newarr.unshift(todo);
    }
  });

  clearDom();
  printAllToDo(newarr);
}
