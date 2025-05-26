const hamburger = document.querySelector('.navbar-Hamburger');
const dropdown = document.querySelector('.nav-dropdown');

hamburger.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});


// VOTE JAVASCRIPT
// Function to toggle the dropdown menu
// if (window.location.pathname.includes('.vote.html')) {
function toggleMenu() {
    const menu = document.querySelector(".dropdown-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }
  
//   search bar toggle
document.querySelector('.search-icon').addEventListener('click', function () {
    const searchBar = document.querySelector('#form');
    if (searchBar.style.display === 'block' || searchBar.style.display === '') {
      searchBar.style.display = 'none';
    } else {
      searchBar.style.display = 'block';
    }
  });


// Only run this on register.html
if (window.location.pathname.includes('register.html')) {
  document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      schoolName: document.getElementById('schoolName').value,
      email: document.getElementById('schoolEmail').value,
      location: document.getElementById('location').value
    };

    try {
      const res = await fetch('https://school-voting-backend-5ika.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      document.getElementById('responseMessage').textContent = result.message || 'Registered!';
      document.getElementById('registrationForm').reset();
    } catch (error) {
      document.getElementById('responseMessage').textContent = 'Error submitting registration.';
    }
  });
}
