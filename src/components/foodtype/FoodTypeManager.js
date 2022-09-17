export const getFoodTypes = () =>{
    return fetch("http://localhost:8000/foodtypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}