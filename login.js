 const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      
      if (!email || !password) {
        alert('Please fill all fields');
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
          alert("Login ✅");
          localStorage.setItem('authToken', data.uid);
          window.location.href = "index.html";
        } else {
          alert('Login failed: ' + data.error);
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });