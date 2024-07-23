// import statements
import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/hero.css';
import '../styles/components/task.css';
import '../styles/util.css';

// Date tracker
document.addEventListener('DOMContentLoaded', function () {
  const weekdayDay = document.getElementById('weekday');
  const month = document.getElementById('month');
  const today = new Date();

  const getSuffix = function (day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const day = today.getDate();
  const weekdayOptions = { weekday: 'long' };
  const weekday = today.toLocaleDateString(undefined, weekdayOptions);
  const ordinalDate = `${day}${getSuffix(day)}`;
  // Format the month
  const monthOptions = { month: 'long' };
  const monthString = today.toLocaleDateString(undefined, monthOptions);
  // Display the weekday and date
  weekdayDay.textContent = `${weekday}, ${ordinalDate}`;
  // Display the month
  month.textContent = monthString;
});

// updated task count
const updateTaskCount = function () {
  const taskCount = document
    .getElementById('list-box')
    .getElementsByTagName('li').length;
  const taskTrack = document.getElementById('task-track');
  taskTrack.textContent = `${taskCount} current tasks ${
    taskCount !== 1 ? '' : ''
  }`;
};

// adding task functionality
const inputBox = document.getElementById('input-box');
const listBox = document.getElementById('list-box');
const addButton = document
  .getElementById('add-button')
  .addEventListener('click', function addTask() {
    if (inputBox.value === '') {
      alert('You must write something');
    } else {
      let li = document.createElement('li');
      li.className = 'task-item'; // Add a class for styling if needed
      li.innerHTML = inputBox.value;

      // Create and add the icon
      let span = document.createElement('span');
      span.className = 'remove-icon lni lni-cross-circle'; // Use Lineicons class for "X" icon
      span.addEventListener('click', function () {
        li.remove(); // Remove the task when the icon is clicked
        updateTaskCount(); // Update task count if needed
        saveData(); // Save data if needed
      });

      li.appendChild(span); // Add the icon to the list item
      listBox.appendChild(li); // Add the list item to the list

      inputBox.value = ''; // Clear the input field
      updateTaskCount(); // Update task count if needed
      saveData(); // Save data if needed
    }
    inputBox.value = ''; // removes the text after clicking add
    saveData();
  });

// click function
listBox.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      const li = e.target;
      const isChecked = li.classList.contains('checked');
      // Toggle the checked class
      li.classList.toggle('checked');
      // Trigger confetti only if the task is checked (turns green)
      if (!isChecked) {
        triggerConfetti();
      }
      updateTaskCount();
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      updateTaskCount();
      saveData();
    }
  },
  false
);

// adding saved data
const saveData = function () {
  localStorage.setItem('data', listBox.innerHTML);
};
// displaying showed data
const showTask = function () {
  listBox.innerHTML = localStorage.getItem('data');
};
showTask();

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      angle: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    });
  }
}
