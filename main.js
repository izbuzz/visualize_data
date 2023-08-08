// view of all users
const multiUser = document.getElementById("multi-user");
// view of a single user
const singleUser = document.getElementById("single-user");

// button to go back to multi user view
const viewButton = document.getElementById("view-button");

// populate multiUser with all users
addAllUsers();

// hide single user view and show multi user view
viewButton.addEventListener("click", (event) => {
  multiUser.style.display = "flex";
  singleUser.style.display = "none";
});

// create view of all users with buttons
function addAllUsers() {
  for (const [i, user] of data.results.entries()) {
    // box and button to hold everything together
    const button = document.createElement("button");
    button.classList.add("box");
    button.style["font-size"] = "1em";

    // brackets
    const lBracket = document.createElement("div");
    lBracket.textContent = "{";
    lBracket.classList.add("large-brackets");

    const rBracket = document.createElement("div");
    rBracket.textContent = "}";
    rBracket.classList.add("large-brackets");

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style["flex-direction"] = "column";
    container.style.gap = "5px";

    const img = document.createElement("img");
    img.src = user.picture.large;

    const name = document.createElement("span");
    name.textContent = user.name.first + " " + user.name.last;
    name.classList.add("blue");

    container.appendChild(img);
    container.appendChild(name);

    button.appendChild(lBracket);
    button.appendChild(container);
    button.appendChild(rBracket);

    button.addEventListener("click", (event) => {
      showUser(i);
    });
    multiUser.appendChild(button);
  }
}

function showUser(index) {
  // show single user view and hide multi user view
  singleUser.style.display = "block";
  multiUser.style.display = "none";
  const user = data.results[index];

  // set picture to user's portrait
  const portrait = document.getElementById("portrait");

  portrait.src = user.picture.large;

  // about section
  const name = document.getElementById("name");
  const gender = document.getElementById("gender");
  const dob = document.getElementById("dob");

  name.textContent = user.name.first + " " + user.name.last;
  gender.textContent = user.gender;
  // prettier looking date
  dob.textContent = new Date(user.dob.date).toDateString();

  // location section
  const street = document.getElementById("street");
  const coordinates = document.getElementById("coordinates");
  const timezone = document.getElementById("timezone");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const country = document.getElementById("country");

  street.textContent = mergeValues(user.location.street);
  city.textContent = user.location.city;
  state.textContent = user.location.state;
  country.textContent = user.location.country;
  coordinates.textContent = mergeValues(user.location.coordinates, ", ");
  timezone.textContent = mergeValues(user.location.timezone);

  // registration section
  const id = document.getElementById("id");
  const regDate = document.getElementById("registration-date");
  const regAge = document.getElementById("registration-age");

  id.textContent = user.id.name + ": " + user.id.value;
  regDate.textContent = new Date(user.registered.date).toDateString();
  regAge.textContent = user.registered.age;

  // ids of every element in the contacts section
  ["email", "phone", "cell"]
    .map((i) => document.getElementById(i)) // get element using id
    .forEach((e) => e.textContent = user[e.id]); // then set the content

  // ids of every element in the login section
  ["uuid", "username", "password", "salt", "md5", "sha1", "sha256"]
    .map((i) => document.getElementById(i)) // get element using id
    .forEach((e) => e.textContent = user.login[e.id]); // then set the content
}

// join all values of the json key with delim
function mergeValues(key, delim=" ") {
  return Object.values(key).join(delim);
}
