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
    alert("Please enter a username!");
    return;
  }

  document.querySelector("#loading").style.display = "block";
  document.querySelector("#userCard").style.display = "none";

  const url = `https://api.github.com/users/${user}`;

  fetch(url)
    .then((response) => {
      console.log("Raw response:", response); 
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log("Parsed user data:", data);

      fullName.textContent = data.name || "No name";
      userId.textContent = "@" + data.login;
      bio.textContent = data.bio || "No bio available.";
      repoNum.textContent = data.public_repos;
      follwers.textContent = data.followers;
      following.textContent = data.following;
      userAvatar.src = data.avatar_url;
      document.querySelector("#profileLink").href = data.html_url;

      document.querySelector("#userCard").style.display = "block";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert(error.message || "Something went wrong.");
    })
    .finally(() => {
      document.querySelector("#loading").style.display = "none";
    });
}


searchBtn.addEventListener("click", fetchData);

searchBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        fetchData();
    }
});
