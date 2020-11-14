window.onload = function () {
  fetchGitHubProfile();
// displayProfileDetails();
// displayRepositories()
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
        displayRepositories(res.data)
    });
}

function displayProfileDetails(data) {
    const { login, bio, avatarUrl, name } = data.viewer;
    
    const userDetails = document.getElementById('userDetails');
    // user full name
    appendTag('p', ['user-fullname'], name, userDetails);

    // user name
    appendTag('p', ['user-nick', 'text-grey'], login, userDetails);

    // description
    appendTag('p', ['user-role'], bio, userDetails);

    const userTinyDetails = document.getElementById('smallUserInfo');
    appendTag('span', [], login, userTinyDetails);
    
    // update picture
    const userAvatarLarge = document.getElementById('user-avatar');
    const userAvatarSmall = document.getElementById('user-avatar-small');
    const userAvatarTiny = document.getElementById('user-avatar-tiny');
    userAvatarLarge.src = avatarUrl
    userAvatarSmall.src = avatarUrl
    userAvatarTiny.src = avatarUrl
}
function displayRepositories(data) {
    const { repositories } = data.viewer;

    for (let index = 0; index < repositories.edges.length; index++) {
        const repository = repositories && repositories.edges && repositories.edges[index] && repositories.edges[index].node;
        if(repository) {
            renderRepositoryDetail(repository)
        }
        
    }
}
function renderRepositoryDetail(repository) {
    const repositoryListing = document.getElementById('repositories-listing');
    const sectionDiv = createDiv(['section-divider']);
    const upperDiv = createDiv(['flex','flex-justify-space-between','padding-horizontal-10']);

    const titleDiv = createDiv(['repo-holder']);
    appendTag('p',['repo-title'], repository.name , titleDiv);
    repository.description ? 
        appendTag('p',['text-grey-dark','padding-horizontal-10'], repository.description, titleDiv)
        : null;
    
    const btnDiv = document.createElement('div');
    const buttonDiv = createDiv(['btn']);
    appendTag('i', ['fa','fa-star'], ' Star', buttonDiv)
    
    btnDiv.appendChild(buttonDiv)
    upperDiv.appendChild(titleDiv)
    upperDiv.appendChild(btnDiv)
    sectionDiv.appendChild(upperDiv)
    repositoryListing.appendChild(sectionDiv);

    const lowerDiv = createDiv(['flex','flex-justify-start','padding-horizontal-10','text-grey-dark'])

    if (repository.languages && repository.languages.nodes && repository.languages.nodes[0]) {
        const lang = repository.languages.nodes[0]
        const langauageDiv = createDiv(['flex','flex-align-items-center','margin-right-10'])
        const langColorDiv = createDiv(['indicator','indicator-js']); // TODO change color
        langColorDiv.style = `background-color: ${lang.color}`
        langauageDiv.appendChild(langColorDiv)
        appendTag('span', ['margin-vertical-10'], lang.name , langauageDiv)
    
        lowerDiv.appendChild(langauageDiv)
    } 


    const starDiv = createDiv(['flex','flex-align-items-center','margin-right-10'])
    appendTag('i', ['fa','fa-star'], '', starDiv)
    appendTag('span', ['margin-vertical-10'], ` ${repository.stargazerCount}`, starDiv)

    lowerDiv.appendChild(starDiv)

    const forkDiv = createDiv(['flex','flex-align-items-center','margin-right-10'])
    appendTag('i', ['fa','fa-code-fork'], '', lowerDiv)
    appendTag('span', ['margin-vertical-10'], ` ${repository.forkCount}`, lowerDiv)

    lowerDiv.appendChild(forkDiv)

    const updatedDiv = createDiv(['flex','flex-align-items-center','margin-right-10'])
    appendTag('span', ['margin-vertical-10'], ` Updated ${new Date(repository.updatedAt).toDateString()}`, updatedDiv)

    lowerDiv.appendChild(updatedDiv)


    sectionDiv.appendChild(lowerDiv)
}
function createDiv(classes) {
    const div = document.createElement('div');
    div.classList.add(...classes)
    return div
}
function appendTag(type, classes, content, parent) {
    const tag = document.createElement(type)
    tag.classList.add(...classes)
    tag.appendChild( document.createTextNode(content))
    parent.appendChild(tag);
    return parent;
}
