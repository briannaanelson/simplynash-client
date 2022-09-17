import React from "react";
import { Route } from "react-router-dom";
import { BreakfastPostList } from "./Breakfast/BreakfastPostList";
import { PostForm } from "./post/PostForm";
import { PostList } from "./post/PostList";

export const ApplicationViews = () => {
    return ( <>
         <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>

            <Route exact path="/"></Route>

            <Route exact path="/posts"><PostList /></Route>
            <Route exact path="/posts/new"><PostForm /></Route>

            <Route exact path="/breakfast"><BreakfastPostList /></Route>


        </main>
    </>
    )
}