const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#userName-signup').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json()
      console.log('DATA --> ', data)
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('! Signup failed');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  