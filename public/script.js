const BACKEND_URL = "https://school-voting-backend-5ika.onrender.com";

// ✅ Navbar hamburger menu
const hamburger = document.querySelector('.navbar-Hamburger');
const dropdown = document.querySelector('.nav-dropdown');

if (hamburger && dropdown) {
  hamburger.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });
}

// ✅ Fetch all schools initially — only if needed
fetch(`${BACKEND_URL}/api/schools`)
  .then(res => res.json())
  .then(data => {
    // you can populate dropdown or log here
    // console.log(data);
  });

// ✅ Dropdown toggle function (used in vote.html)
function toggleMenu() {
  const menu = document.querySelector(".dropdown-menu");
  if (menu) {
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }
}

// ✅ Search bar toggle
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('#form');

if (searchIcon && searchBar) {
  searchIcon.addEventListener('click', function () {
    if (searchBar.style.display === 'block' || searchBar.style.display === '') {
      searchBar.style.display = 'none';
    } else {
      searchBar.style.display = 'block';
    }
  });
}

// ✅ Only run this on register.html
if (window.location.pathname.includes('register.html')) {
const registrationForm = document.getElementById('registrationForm');
const responseMessage = document.getElementById('responseMessage');

if (registrationForm && responseMessage) {
  registrationForm.addEventListener('submit', async function (e) {
    console.log("Form submitted!"); // Debug line

    e.preventDefault();

    const data = {
      schoolName: document.getElementById('schoolName')?.value,
      email: document.getElementById('schoolEmail')?.value,
      location: document.getElementById('location')?.value,
      studentClass: document.getElementById('studentClass')?.value,
      contestants: [
        {
          name: document.getElementById('contestant1')?.value,
          activity: document.getElementById('activity1')?.value
        },
        {
          name: document.getElementById('contestant2')?.value,
          activity: document.getElementById('activity2')?.value
        },
        {
          name: document.getElementById('contestant3')?.value,
          activity: document.getElementById('activity3')?.value
        }
      ]
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log("Server response:", result); // Debug line

      responseMessage.textContent = result.message || 'Registration successful!';
      responseMessage.style.color = "green";
      registrationForm.reset();

      // Optional: Redirect after success
      setTimeout(() => {
        window.location.href = "./vote.html";
      }, 2000);
    } catch (error) {
      responseMessage.textContent = 'Error submitting registration.';
      responseMessage.style.color = "red";
      console.error(error);
    }
  });
}
}