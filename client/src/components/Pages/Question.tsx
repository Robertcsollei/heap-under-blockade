import React, {useState, useEffect} from 'react'



import {Comments, Questions, Post, Users, Categories, resComment} from '../../interfaces'

import Card from '../Shared/Card/Card'
import Comment from '../Shared/Comment/Comment'
import Answer from '../Shared/Answer/Answer'

function Question() {
    const [counter, setCounter] = useState<any>([])
    const [posts, setPosts] = useState<Array<Post>>([])
    const [comments, setComments] = useState<Array<Comments>>([])
    const [user, setUser] = useState("")


    let currentId = window.location.pathname.split("/")[2]

    function getPost(userData: Users, data:Questions, catList: Categories, newTime: number): Post{
        let Post : Post = {
            UserName: userData.UserName,
            UserId: userData._id,
            ProfileImage: userData.ProfileImage,
            CategoryId: data.Categoryid,
            Category: catList.Name,
            QuestionId: data._id,
            Title: data.Title,
            Body: data.Body,
            Tags: data.Tags,
            PostDate: newTime,
            isBlocked: data.isBlocked,
            NumberOfComments: data.Comments.length,
            Votes: data.Votes            

         }
         return Post
    }

    
    useEffect(() => {
        const fetchData = async () => {
            //default user. No log in page in the app, so we are always John Doe
            setUser("5f9faa3211557067b44addad")
            
            //get a specific question by the ID in the URI
            const url = `${process.env.REACT_APP_API}/question/${currentId}`;
            const response = await fetch(url);
            const data = await response.json();
    
            //get the category of the question
            let caturl = `${process.env.REACT_APP_API}/category/${data.Categoryid}`
            const res = await fetch(caturl)
            const catList = await res.json()

            //get The user who posted it
            const userUrl = `${process.env.REACT_APP_API}/user/${data.UserId}`
            const userRes = await fetch(userUrl)
            const userData = await userRes.json()
            //type conflict explained in Category.tsx -> 31 - 32 
            //@ts-ignore
            let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(data.PostDate)).getTime())
            let difference =  diffTime / (1000 * 3600 * 24)
            let newTime = Math.round(difference)
           
            //Post is moved up to line 20 - was part of an architectural changes which are not yet implemented. Connected to line 112 UpdateVotes()
           let Post: Post = getPost(userData, data, catList, newTime)
            setPosts([ Post])
         
            //Empty array for duplicate checking
            let tempCom: Array<Comments> = []

            //Get All comments
            data.Comments.map(async (cmt: string) => {
                
                const cmtUrl = `${process.env.REACT_APP_API}/comment/${cmt}`
                let id = cmt
                const cmtRes = await fetch(cmtUrl)
                const cmtData = await cmtRes.json()

                const userUrl = `${process.env.REACT_APP_API}/user/${cmtData.UserId}`
                const userRes = await fetch(userUrl)
                const userData = await userRes.json()

                let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(cmtData.PostDate)).getTime())
                let difference =  diffTime / (1000 * 3600 * 24)
                let newTime = Math.round(difference)

                let newComment : Comments = {
                    _id: id,
                    UserName: userData.UserName,
                    UserId: userData._id,
                    ProfileImage: userData.ProfileImage,
                    EventImage: cmtData.EventImage,
                    QuestionId: currentId,
                    Title: cmtData.Title,
                    Body: cmtData.Body,
                    PostDate: newTime,
                    isBlocked: false,
                    Votes: cmtData.Votes  
                }
               
                if(!tempCom.includes(newComment)){
                    tempCom.push(newComment)
                }
               setComments(oldComments => [...tempCom].sort((a,b) => {return b.Votes - a.Votes}))
               
            })
    
    } 
    
    fetchData()
    
    }, [counter])

    //Update Votes in the database on arrow click ->  arrows are in the nested objects -> [Card, Comment]
    async function updateVotes(uuid: string, AddsUp: boolean, isQuestion: boolean){
        let type = isQuestion ? "question" : "comment"

            
                        const newUrl = `${process.env.REACT_APP_API}/${type}/votes/${uuid}`;
                         let res = await fetch(newUrl, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                add: AddsUp
                            })
                        });
                        let data = await res.json();
                        setCounter([...counter, 1])
           
                        
    }

 


    return(
        <>
           {posts && (
               <Card posts={posts} currentId={currentId} updateVotes={updateVotes} />
           )}
           {comments && (
               comments.map((cmt, index)=> {
                   return <Comment key={index} currentId={currentId} comments={cmt} updateVotes={updateVotes} />
               })
           )}
           {/* Answer is the for to send new comments */}
           <Answer currentId={currentId} setCounter={setCounter}/>
           
        </>
    )
}

export default Question