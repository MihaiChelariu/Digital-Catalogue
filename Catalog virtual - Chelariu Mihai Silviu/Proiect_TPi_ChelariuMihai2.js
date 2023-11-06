// JavaScript (app.js)
axios.defaults.baseURL = 'http://localhost:3000';
document.getElementById('addUserForm').addEventListener('submit', addUser);

// Function to add a new user
async function addUser(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById('nameInput').value;
  const email1 = document.getElementById('emailInput').value;
  const password1 = document.getElementById('passwordInput').value;

  const user = { username: name, email: email1, password: password1};

  console.log(user);

  try {
    await axios.post('/users/addUser', user);
    alert('User added successfully');
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
    getUsers();
  } catch (error) {
    console.error(error);
    alert('An error occurred while adding the user');
  }
}

// Function to edit grade
async function editGrade(email) {
  const newGrade = prompt(`Introduceți o nouă notă pentru ${email}:`);
  if (newGrade !== null) {
    try {
      const response = await axios.put('/users/editGrade', {
        email: email,
        subject: '', // Replace with the correct subject
        newGrade: parseFloat(newGrade),
      });
      alert('Nota a fost actualizată cu succes');
      getUsers();
    } catch (error) {
      console.error(error);
      alert('A apărut o eroare în timpul actualizării notei');
    }
  }
}

// Function to edit absences
async function editAbsences(email) {
  const newAbsences = prompt(`Introduceți un nou număr de absențe pentru ${email}:`);
  if (newAbsences !== null) {
    try {
      const response = await axios.put('/users/editAbsences', {
        email: email,
        newAbsences: parseInt(newAbsences),
      });
      alert('Numărul de absențe a fost actualizat cu succes');
      getUsers();
    } catch (error) {
      console.error(error);
      alert('A apărut o eroare în timpul actualizării numărului de absențe');
    }
  }
}

// Function to delete user
async function deleteUser(email) {
  const confirmDelete = confirm('Sunteți sigur că doriți să ștergeți acest utilizator?');
  if (confirmDelete) {
    try {
      const response = await axios.delete(`/users/removeUser`,{data: {email: email}});
      alert('Utilizatorul a fost șters cu succes');
      getUsers();
      // console.log(response);
    } catch (error) {
      console.error(error);
      alert('A apărut o eroare în timpul ștergerii utilizatorului');
    }
  }
}

// Function to get all users
async function getUsers() {
  try {
    const response = await axios.get('/users/allUsers');
    const users = response.data;

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const tableHeader = document.querySelector('.header');
    tableHeader.innerHTML = `
      <span>Username</span>
      <span>Email</span>
      <span>Număr Absențe</span>
      <span>Nota</span>
      <span>Acțiuni</span>
    `;

    users.forEach((user) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${user.username}</span>
        <span>${user.email}</span>
        <span>${user.absences}</span>
        <span>${user.grades}</span>
      `;

      const editGradeButton = document.createElement('button');
      editGradeButton.textContent = 'Edit Grade';
      editGradeButton.addEventListener('click', () => editGrade(user.email));

      const editAbsencesButton = document.createElement('button');
      editAbsencesButton.textContent = 'Edit Absences';
      editAbsencesButton.addEventListener('click', () => editAbsences(user.email));

      // console.log(user.email);
      const deleteUserButton = document.createElement('button');
      deleteUserButton.textContent = 'Delete User';
      deleteUserButton.addEventListener('click', () => deleteUser(user.email));

      listItem.appendChild(editGradeButton);
      listItem.appendChild(editAbsencesButton);
      listItem.appendChild(deleteUserButton);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    alert('A apărut o eroare în timpul obținerii utilizatorilor');
  }
}

// Initial call to get all users
getUsers();
