async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
}

async function generateTable(userData) {
  const users = await userData;
  const column = Object.keys(users[0]);
  const table = document.querySelector('#user-table');
  const row = document.createElement('tr');

  // Create headings from JSON Object keys
  for (let k = 0; k < column.length; k++) {
    const header = document.createElement('th');
    header.textContent = column[k];
    row.append(header);
    table.append(row);
  }

  // Create rows from predefined user info
  for (let i = 0; i < users.length; i++) {
    const row = table.insertRow();
    row.classList.add('user-row');
    row.setAttribute('key', users[i].id);
    row.innerHTML = `<td>${users[i].id}</td>
      <td>${users[i].name}</td>
      <td>${users[i].username}</td>
      <td>${users[i].email}</td>
      <td>${users[i].address.city}</td>
      <td>${users[i].phone}</td>
      <td>${users[i].website}</td>
      <td>${users[i].company.name}</td>`;
  }

  // Add click event to each row
  const rows = document.querySelectorAll('.user-row');
  rows.forEach((row) => row.addEventListener('click', (e) => generatePosts(e.target.parentElement.attributes[1].value)));
}

generateTable(fetchUsers());

const generatePosts = async (id) => {
  // Removes old Post div if it exists
  if (document.querySelector('.post-wrapper')) { document.querySelector('.post-wrapper').remove(); }

  // Fetch posts using id parameter
  const fetchUsersPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const data = await fetchUsersPosts.json();
  const app = document.querySelector('body');
  const postWrapper = document.createElement('div');
  postWrapper.classList.add('post-wrapper');

  // Map over every post to create a div with title and body
  data.map((post) => {
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const title = document.createElement('p');
    const body = document.createElement('p');

    title.textContent = `Title: ${post.title}`;
    body.textContent = `Body: ${post.body}`;

    postContent.append(title, body);

    postWrapper.appendChild(postContent);
  });

  app.appendChild(postWrapper);
};
