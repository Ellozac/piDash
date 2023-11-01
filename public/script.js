window.addEventListener('load', () => {
  document.getElementById('signin').addEventListener('submit', (event) => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const logDetails = { username, password };
    fetch("/loginReq", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logDetails),
    })
    .then(response => response.json())
  });
})

