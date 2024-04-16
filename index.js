let users = [];
let posts = [];
let comments = [];

const body = document.getElementById('main');

const getusers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        users = JSON.stringify(json);
        let selector = document.getElementById('selectUsers');
        json.forEach(user => {
                let option = document.createElement('option');
                option.setAttribute('id', user.id);
                option.innerText = `${user.name}`;
                selector.appendChild(option);            
        })
    });
}

const getPosts =  () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        posts = JSON.stringify(json);
        // let divPosts = document.createElement('div');
        // divPosts.innerText = `${posts}`;
        // body.appendChild(divPosts);
    });    
}

const getComments =  () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        comments = JSON.stringify(json);
        // let divComments = document.createElement('div');
        // divComments.innerText = `${comments}`;
        // body.appendChild(divComments);
    });
}


getusers();
getPosts();
getComments();
