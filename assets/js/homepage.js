const userFormEl = document.querySelector("#user-form");

const nameInputEl = document.querySelector("#username");

const repoContainerEl = document.querySelector("#repos-container");

const repoSearchTerm = document.querySelector("#repo-search-term");


const getUserRepos = function(user) {

    const apiUrl ="https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function(response) {

        if (response.ok) {

            response.json().then(function(data) {
                displayRepos(data, user);
            });

        } else {
            alert("Error: GitHub User Not Found");
        }

    })

    .catch(function(error){
        alert("Unable to connect to GitHub");
    });

};

const formSubmitHandler = function(event) {
    
    event.preventDefault();
    
    const username = nameInputEl.value.trim();
    
    if(username) {
        getUserRepos(username);
        repoContainerEl.textContent = '';
        nameInputEl.value = '';
        
    }else{
        alert ("Please enter a GitHub username");
    }
    console.log(event);
};

const displayRepos = function(repos, searchTerm) {
    if (repos.length === 0) {

        reposContainerEl.textContent = "No repositories found.";

        return;
    }

    repoSearchTerm.textContent = searchTerm;
    
    for (var i = 0; i < repos.length; i++ ) {
        const repoName =repos[i].owner.login + "/" + repos[i].name;

        const repoEl = document.createElement("div");
        repoEl.classList= "list-item flex-row justify-space-between align-center";
        
        const titleEl= document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        const statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if(repos[i].open_issues_count > 0) {

            statusEl.innerHTML= "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";

        }else {

            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";

        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
    console.log(repos);
    console.log(searchTerm);
};
  
userFormEl.addEventListener("submit", formSubmitHandler);