import React, {useState, useEffect} from 'react'
import {    NavLink  } from "react-router-dom";

import {  Post} from '../../../interfaces'

function Card(params: any) {
    
    let posts: Array<Post> = params.posts
   

    
    
    return(
        <>
           
                <div className="Card_list"> {posts.map((post, index) => {
                    
                return <div key={index} className="Card">

                    <NavLink to={`/users/${post.UserId}`} className="profile">
                        <div className="profile_info">
                            <div className="profileImage">
                                <img src={post.ProfileImage} alt={post.UserName} />
                            </div>
                        
                            <h4 className="profile_name">{post.UserName}</h4>
                        </div>
                        
                             <p className="upCounter">{post.Votes}</p>

                    </NavLink>

                    <NavLink to={`/questions/${post.QuestionId}`} className="question_body">

                    <h3 className="question_title">{post.Title}</h3>
                    <p  className="question_desc">{post.Body}</p>
                    
                    </NavLink>

                    
                        <div className="conter_vote">
                            <p className="counter">{post.NumberOfComments}</p>
                            {params.currentId !== undefined && (
                                <div className="vote">
                                <div onClick={() => params.updateVotes(params.currentId, true, true)} className="up"></div>
                                <div onClick={() => params.updateVotes(params.currentId, false, true)} className="down"></div>
                            </div>
                            )}
                            
                        </div>
                    <NavLink to={`/category/${post.CategoryId}`} className="meta">
                        <p className="post_date">Posted {post.PostDate} days ago</p>
                        <p className="category">{post.Category}: 
                                            {post.Tags.map(tag => <span className="tag"> {tag} </span>)}</p>

                    </NavLink>
                   
                </div>
                })}</div>
           
        </>
    )
}

export default Card