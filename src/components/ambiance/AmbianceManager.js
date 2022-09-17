export const getAmbiance = () =>{
    return fetch("http://localhost:8000/ambiance", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}