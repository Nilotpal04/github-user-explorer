const searchBox = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const userAvatar = document.querySelector("#avatar");
const fullName = document.querySelector("#fullname");
const userId = document.querySelector("#username");
const bio = document.querySelector("#bio");
const repoNum = document.querySelector("#repos");
const follwers = document.querySelector("#followers");
const following = document.querySelector("#following");

function fetchData() {
  const user = searchBox.value.trim();
  if (user === "") {
    alert("Please enter an username!");
    return;
  }

  document.querySelector("#loading").style.display = "block";
  document.querySelector("#usercard").style.display = "none";
  
  const url = `https://api.github.com/users/${user}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Usesr not found");
      }
      return response.json();
    })

    .then((data) => {
      console.log("user data", data);

      fullName.textContent = data.name;
      userId.textContent = data.login;
      bio.textContent = data.bio;
      repoNum.textContent = data.public_repos;
      follwers.textContent = data.followers;
      following.textContent = data.following;
      userAvatar.src = data.avatar_url;
      document.querySelector("#profileLink").href = data.html_url;
      document.querySelector("#userCard").style.display = "block";
    })
    .catch(error => {
    alert("User not found or an error occurred.");
    console.error(error);
}); 
};

searchBtn.addEventListener("click", fetchData);

searchBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        fetchData();
    }
});
