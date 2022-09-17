export const getPosts = () => {
    return fetch("http://localhost:8000/restaurantposts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (newPost) => {
    return fetch("http://localhost:8000/restaurantposts", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }).then(response => response.json())
}

export const updatePost = (editedPost) => {
    return fetch(`http://localhost:8000/restaurantposts/${editedPost.id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    }).then(getPosts)
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8000/restaurantposts/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}