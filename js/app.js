window.onload = function () {
  fetchGitHubProfile();
// displayProfileDetails();
};

function fetchGitHubProfile() {
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer 2eac1c7b3a8b0116ca1fcf6a4f8f3e5c7ba0fd93" },
    body: JSON.stringify({ query: "query { viewer { login, bio, avatarUrl, name repositories(last: 20) { edges { node { id, name, description, forkCount, stargazerCount, updatedAt, languages(first: 1) {nodes {name, color}}}}totalCount}}}" }),
  })
    .then((res) => res.json())
    .then((res) => {
        console.log(res.data)
        displayProfileDetails(res.data)
    });
}

function displayProfileDetails(data) {
    const { login, bio, avatarUrl, name } = data.viewer;
    
    const userDetails = document.getElementById('userDetails');
    // user full name
    appendTag('p', ['user-fullname',], name, userDetails);

    // user name
    appendTag('p', ['user-nick', 'text-grey'], login, userDetails);

    // description
    appendTag('p', ['user-role'], bio, userDetails);

    
    // update picture
    const userAvatarLarge = document.getElementById('user-avatar');
    const userAvatarSmall = document.getElementById('user-avatar-small');
    userAvatarLarge.src = avatarUrl
    userAvatarSmall.src = avatarUrl



}
function appendTag(type, classes, content, parent) {
    const tag = document.createElement(type)
    tag.classList.add(...classes)
    tag.appendChild( document.createTextNode(content))
    parent.appendChild(tag);
    return parent;
}
