import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { createPost, updatePost, getPostById } from "./PostManager";
import { getAmbiance } from "../ambiance/AmbianceManager";
import { getPrices } from "../price/PriceManager";

export const PostForm = () => {
    const history = useHistory()
    const [ prices, setPrices] = useState([])
    const [checkedAmbiances, setCheckedAmbiances] = useState([])
    const [ ambiances, setAmbiances ] = useState([])
    const { id } = useParams()
    const editMode = id ? true : false

    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    today = `${yyyy}-${mm}-${dd}`;
    //     user : localStorage.getItem("lu_token"),

    const [currentPost, setCurrentPost] = useState({
        name: "",
        address: "",
        publication_date: today,
        parking: 1,
        price:"",
        image_url: "",
        description: "",
        ambiances: []
        
    })

    // useEffect(() => {
    //     getCategory().then(setCategories)
    //     getTags().then(setTags)
    //     if (editMode) {
    //         let isMounted = true;
    //         getPostById(id).then((res) => {
    //             console.log('currentres',res)
    //             if (isMounted) {
    //                 setCurrentPost(res)
    //                 const postTags = res.tags.map(tag => parseInt(tag.id))
    //                 console.log('currentPost',postTags)
    //                 setCheckedTags(postTags)

    //             }                
    //         })        
    //     }
        
    // }, [])

    useEffect(() => {
        getPrices().then(setPrices)
        getAmbiance().then(setAmbiances)
        if (editMode) {
            let isMounted = true;
            getPostById(id).then((res) => {

                if (isMounted) {
                    setCurrentPost({
                        name: res.name,
                        address: res.address,
                        publication_date: res.publication_date,
                        parking: res.parking,
                        price: res.price.id,
                        image_url: res.image_url,
                        description: res.description,
                        ambiances:res.ambiances
                    })
                    const postAmbiance = res.ambiances.map(ambiance => parseInt(ambiance.id))
                    setCheckedAmbiances(postAmbiance)
                    console.log('currentPost',currentPost)
                }                
            })        
        }
        
    }, [])

    useEffect(() => {
        const changedPost = { ...currentPost }
        changedPost.ambiances = checkedAmbiances
        setCurrentPost(changedPost)
    }, [checkedAmbiances])

    const changePostState = (e) => {
        const newPost = { ...currentPost}
        if (e.target.name.includes("ambiance")) {
            const currentAmbiances = [...checkedAmbiances]
            if (e.target.checked) {
                currentAmbiances.push(parseInt(e.target.value))
            } else {
                const index = currentAmbiances.indexOf(parseInt(e.target.value))
                currentAmbiances.splice(index, 1)
            }

            setCheckedAmbiances(currentAmbiances)
        }

        let selectedVal = e.target.value
        if (e.target.name.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }
        newPost[e.target.name] = selectedVal
        setCurrentPost(newPost)
    }

    return(
        <form className="postForm">
            <h2 className="postForm_title">Create New Post</h2>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="restaurantname">Restaurant Name:</label>
                    <input type="text" name="restaurantname" required autoFocus className="form-control"
                        defaultValue={currentPost.name}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Restaurant Price:</label>
                    <select value={currentPost.price} name="price" onChange={changePostState} className="form-control">
                        <option value="0">Select a Price Point</option>
                        {prices.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input type="text" name="image_url" required autoFocus className="form-control"
                        defaultValue={currentPost.image_url}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" name="address" required autoFocus className="form-control"
                        defaultValue={currentPost.address}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="parking">Parking:</label>
                    <input type="text" name="parking" required autoFocus className="form-control"
                        defaultValue={currentPost.parking}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Restaurant Description:</label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={currentPost.description}
                        onChange={changePostState}
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <h3> Ambiance:</h3>
                    {
                        ambiances.map(c => {
                            return <div key={c.id} className="ambianceCheckbox">
                                <input type="checkbox"
                                    name={`ambiance ${c.id}`}
                                    value={c.id}
                                    checked={checkedAmbiances.includes(c.id)}
                                    onChange={changePostState}
                                ></input>
                                <label htmlFor={c.id}> {c.label}</label>
                            </div>
                        })
                    }
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                   

                    const post = {
                        name: currentPost.name,
                        address: currentPost.address,
                        publication_date: currentPost.publication_date,
                        parking: currentPost.parking,
                        price: parseInt(currentPost.price),
                        image_url: currentPost.image_url,
                        description: currentPost.description,
                        ambiances: [...checkedAmbiances]
                    }

                    editMode ?
                        (updatePost({...post, id})
                        .then(() => history.push("/posts"))):
                        (createPost(post)
                        .then(() => history.push("/posts")))
                    
                    
                }}
                className="btn btn-primary">{editMode ? "Update" : "Add a new post"}</button>
        </form>
    )
}

