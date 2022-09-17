import React, { useEffect, useState} from "react";
import { getPosts } from "./PostManager";
import { useHistory} from "react-router-dom";


export const PostList = () => {
    const [ posts, setPosts ] = useState([])
    const history = useHistory();

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    return (
        <article className="posts">
            <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/posts/new"})
                        }}
                        >Create New Post</button>
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="card">
                        <div className="post_name">{post.name}</div>
                        <div className="post_date">{post.publication_date}</div>
                        <div className="post_address">{post.address}</div>
                        <div className="post_parking">{post.parking}</div>
                        <div className="post_price">{post.price.label}</div>
                        <div className="post_image">{post.image_url}</div>
                        <div className="post_description">{post.description}</div>
                        <div className="post_ambiance">{post.ambiance.label}</div>
                        

                        </section>
                })
            }
        </article>
    )
}