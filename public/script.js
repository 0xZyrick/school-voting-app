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
const searchBar = document.querySelector('.search-form');

  document.querySelector('.search-icon').addEventListener('click', () => {
    const query = document.querySelector('#query').value.toLowerCase();
    console.log('Searching for:', query); // ✅ Debug: check if event triggers

    const schoolCards = document.querySelectorAll('.school-card');

    schoolCards.forEach(card => {
      const name = card.querySelector('.school-name').textContent.toLowerCase();
      card.parentElement.style.display = name.includes(query) ? 'block' : 'none';
    });
  });

// ✅ Only run this on register.html
if (window.location.pathname.includes('/register')) {
  const registrationForm = document.getElementById('registrationForm');
  const responseMessage = document.getElementById('responseMessage');
  const submitPbtn = document.getElementById('submitPbtn');
  const modal = document.getElementById("confirmationModal");
  const closeModal = document.getElementById("closeModal");
  const cancelBtn = document.querySelector('.cancel-btn');

  // CANCEL BUTTON LOGIC
  cancelBtn.addEventListener('click', () => {
    registrationForm.reset();
    submitPbtn.textContent = "Submit";
    submitPbtn.disabled = false;
  });

  // ✅ Remove the previous submit event entirely (we won't use it)

  // ✅ Paystack payment + backend registration flow
  window.proceedRegistration = function () {
    const schoolName = document.getElementById('schoolName').value.trim();
    const email = document.getElementById('schoolEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const lga = document.getElementById('lga').value.trim();
    const state = document.getElementById('state').value.trim();

    // Validate fields
    if (!schoolName || !email || !phone || !lga || !state) {
      alert("Please fill all required fields.");
      return;
    }

    submitPbtn.textContent = "Processing Payment...";
    submitPbtn.disabled = true;

    // Start Paystack payment
    let handler = PaystackPop.setup({
      key: 'pk_live_615ebb0069ee567a13a7fd38571a79c25e3a0a7e',  // Replace with your public key
      email: email,
      amount: 5000000, // ₦50,000 in kobo
      currency: 'NGN',
      callback: function (response) {
        // After payment success, call backend registration
        registerSchoolOnBackend({
          schoolName, email, phone, lga, state, paymentReference: response.reference
        });
      },
      onClose: function () {
        submitPbtn.textContent = "Submit";
        submitPbtn.disabled = false;
        alert('Payment cancelled.');
      }
    });

    handler.openIframe();
  }

  async function registerSchoolOnBackend(data) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        responseMessage.textContent = '';
        modal.style.display = "flex";

        closeModal.onclick = () => modal.style.display = "none";
        window.onclick = (e) => {
          if (e.target == modal) modal.style.display = "none";
        };

        setTimeout(() => {
          modal.style.display = "none";
          window.location.href = "./vote.html";
        }, 3000);
      } else {
        responseMessage.textContent = result.message || 'Registration failed.';
        responseMessage.style.color = "red";
        submitPbtn.disabled = false;
        submitPbtn.textContent = "Submit";
      }
    } catch (err) {
      responseMessage.textContent = 'Something went wrong. Try again.';
      responseMessage.style.color = "red";
      submitPbtn.disabled = false;
      submitPbtn.textContent = "Submit";
      console.error(err);
    }
  }
}
