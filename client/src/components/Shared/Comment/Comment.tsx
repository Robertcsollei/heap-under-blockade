import React from 'react'
import {    NavLink  } from "react-router-dom";

import {  Comments} from '../../../interfaces'

function Comment(params: any) {
    let comments: Array<Comments> = [params.comments]
    console.log(comments)
    
    return(
        <>
           
                <div className="Comment_list"> {comments.map((comment, index) => {
                    
                return <div key={index} className="Comment">

                    <NavLink to={`/users/${comment.UserId}`} className="profile">
                        <div className="profile_info">
                            <div className="profileImage">
                                <img src={comment.ProfileImage} alt={comment.UserName} />
                            </div>
                        
                            <h4 className="profile_name">{comment.UserName}</h4>
                        </div>
                        
                             <p className="upCounter">{comment.Votes}</p>

                    </NavLink>

                    <div className="comment_body">

                    <h3 className="comment_title">{comment.Title}</h3>
                    <p  className="comment_desc">{comment.Body}</p>
                    
                    </div>

                   <div className="meta">

                        <p className="comment_date">commented {comment.PostDate} days ago</p>
                        {params.currentId !== undefined && (
                                <div className="vote">
                                   
                                <div onClick={() => params.updateVotes(comment._id, true, false)} className="up"></div>
                                <div onClick={() => params.updateVotes(comment._id, false, false)} className="down"></div>
                            </div>
                            )}
                        

                        </div>
                   
                </div>
                })}</div>
           
        </>
    )
}

export default Comment