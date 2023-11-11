window.addEventListener('load', () => {
  const spline = document.getElementById("splineView")
  var sheet = new CSSStyleSheet
  sheet.replaceSync( `a#logo {visibility: hidden;`)
  spline.shadowRoot.adoptedStyleSheets.push(sheet)


  
  document.getElementById('signup').addEventListener('submit', (event) => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const signDetails = { username, password, email };
    fetch("/signupInfo", {
  method: "POST",
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signDetails),
    })
    .then(response => response.json())
    .then(status => {
        console.log(status.status())
      })
  });
})

