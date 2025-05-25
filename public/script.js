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
      const res = await fetch('http://localhost:5000/api/register', {
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
