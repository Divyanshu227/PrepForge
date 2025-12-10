    const registerBtn = document.getElementById('registerBtn');
    
    registerBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      
      if (!email || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
          alert("Registered ✅");
          window.location.href = "login.html";
        } else {
          alert('Registration failed: ' + data.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });