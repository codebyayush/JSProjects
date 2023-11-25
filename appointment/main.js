function addUserOnScreen(userinfo) {
  const contactList = document.getElementById("contactList");
  const contactDiv = document.createElement("div");
  // contactDiv.id = userinfo._id;

  contactDiv.innerHTML = `
    <strong>Name: </strong>${userinfo.name}<br>
    <strong>Email: </strong>${userinfo.email}<br>
    <strong>Phone: </strong>${userinfo.phone}<br>
    <strong>UserId: </strong>${userinfo._id}<br>
    <button onclick="editUser('${userinfo.name}','${userinfo.email}','${userinfo.phone}','${userinfo._id}', this)">Edit</button>
    <button onclick="deleteUserFromServer('${userinfo._id}', this)">Delete</button><br>
    <hr>
    `;

  contactList.appendChild(contactDiv);
}

//post the user info to the server $$
function postUserOnServer(name, email, phone) {
  axios
    .post(
      `https://crudcrud.com/api/58b489ea50e14247b6a085fdfd70ab7a/contactinfo`,
      { name, email, phone }
    )
    .then((response) => addUserOnScreen(response.data))
    .catch((err) => console.error(err));
}

//editing user details $$
function editUser(name, email, phone, userId, button) {
  document.getElementById("email").value = email;
  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;

  deleteUserFromServer(userId, button);
}

//delete user info from server and screen  $$
function deleteUserFromServer(userId, button) {
  axios
    .delete(
      `https://crudcrud.com/api/58b489ea50e14247b6a085fdfd70ab7a/contactinfo/${userId}`
    )
    .then((response) => {
      let contactDiv = button.parentElement;
      contactDiv.remove();
      console.log("User info deleted from the server", response);
    })
    .catch((err) => console.error(err));
}

//handling submit button $$
const contacTform = document.getElementById("contactForm");

contacTform.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // addUserOnScreen({ name, email, phone });
  postUserOnServer(name, email, phone);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
});

//on loading the page
window.onload = function () {
  axios
    .get(
      `https://crudcrud.com/api/58b489ea50e14247b6a085fdfd70ab7a/contactinfo`
    )
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        addUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
};
