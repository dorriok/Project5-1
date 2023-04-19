
  



// Get all the button elements
const buttons = document.querySelectorAll('.button');

// Add event listeners to each button
buttons.forEach((button) => {
  // Get the background color for this button
  const bg = button.getAttribute('data-bg');
  
  // Change the background color of the body when the button is hovered
  button.addEventListener('mouseover', () => {
    document.body.style.backgroundColor = bg;
  });
  
  // Change the background color of the body back to white when the button is not hovered
  button.addEventListener('mouseout', () => {
    document.body.style.backgroundColor = 'black';
  });
});