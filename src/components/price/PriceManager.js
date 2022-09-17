export const getPrices = () => {
    return fetch("http://localhost:8000/prices", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}