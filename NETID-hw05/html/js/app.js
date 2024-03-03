// add an 'load' event listener to the window object to call 
// the loadInitialPosts() function when loading is complete

/**
 * We haven't talked about async / await yet, but it is a modern
 * JavaScript construct to wait for certain asynchronous operations
 * to finish first before going on. 
 * 
 * Any function using `await` must be designated as `async` in the 
 * function declaration
 */
async function loadInitialPosts() {
    // Use the `fetch` API to retrieve data from the PictureGram API `/posts` endpoint.
    let post_response = await fetch("https://csc346picturegram.test.apps.uits.arizona.edu/posts")
                            .then((response) => response.json())
    
    // Test to see if post_response is undefined.
    // If it is undefined, log a console error "post_response not set"
    if (post_response === undefined) {
        console.error("post_response not set");
    }

    // Check to make sure that the `post_response.status` is "OK"
    // if it is not, log the status and error message to the console
    if (post_response.status !== "OK") {
        console.error("Error:", post_response.status, post_response.message);
        return;
    }

    // get a reference to the post_response.messages returned and
    // store it in a local variable named `posts` using `let`. 
    let posts = post_response.messages;

    // Get a reference to the `postscontainer` element, and store it 
    // on a new local variable named `container`.
    let container = document.getElementById('postscontainer');

    // for each message in the posts array, call the 
    // makeNewPostElement() function and pass the current post
    // to it from the loop.
    //
    // Store the returned object on a new local variable named `newCard`.
    //
    // Append each `newCard` to the `container` element.
    posts.forEach(post => {
        let newCard = makeNewPostCard(post);
        container.appendChild(newCard);
    });
}

// Add an 'load' event listener to the window object
window.addEventListener('load', function() {
    // Call the loadInitialPosts() function when loading is complete
    loadInitialPosts();
});

function makeNewPostCard(post) {

    let postCard = document.createElement("div")
    postCard.classList.add("card")
    postCard.classList.add("mb-4")

    // See if this post has an image
    if (post.image_thumbnail_url != undefined) {
        let postImage = document.createElement("img")
        postImage.src = post.image_thumbnail_url
        if (post.image_description != undefined) {
            postImage.alt = post.image_description
            postImage.title = post.image_description
        }
        postCard.appendChild(postImage)
    }

    let postBody = document.createElement("div")
    postBody.classList.add("card-body")
    postCard.appendChild(postBody)

    let postMessage = document.createElement("div")
    postMessage.textContent = post.message
    postBody.appendChild(postMessage)
    
    let postFooter = document.createElement("div")
    postFooter.classList.add("card-text")
    postBody.appendChild(postFooter)

    let username = document.createElement("small")
    d = new Date(Number(post.timestamp) * 1000)
    username.textContent = "@" + post.username + " (" + d.toLocaleDateString() + ")"
    postFooter.appendChild(username)

    return postCard
}
