import React, {useState, useEffect} from 'react'


import {Categories, Questions, Post} from '../../interfaces'

import Card from '../Shared/Card/Card'

function Category() {
const [posts, setPosts] = useState<Array<Post>>([])

useEffect(() => {
    const fetchData = async () => {
          
        //gets the category by id. -> also currentId gets the ObjectId from the Url
        //This is for displaying the category name
        let currentId = window.location.pathname.split("/")[2]
        const url = `${process.env.REACT_APP_API}/category/${currentId}`;
        const response = await fetch(url);
        const data = await response.json();

        //gets all questions which share the same id
        let qstUrl = `${process.env.REACT_APP_API}/getQuestions/${currentId}`
        const res = await fetch(qstUrl)
        const qstList = await res.json()
     
        //iterate trough all the questions and biuld a new Post object - The Post object is displayed later as a question. It holds more data than the QuestionModel in the db
        qstList.map(async (qst: Questions) => {
            const userUrl = `${process.env.REACT_APP_API}/user/${qst.UserId}`
            const userRes = await fetch(userUrl)
            const userData = await userRes.json()
            //Calculate how many days ago was the question posted. Weird TS warning, - Date is not assignable to string.
            //Since I need to check in other places for Date, and here it needs string I just disabled it. It's string in the end nevertheless
            //@ts-ignore
            let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(qst.PostDate)).getTime())
            let difference =  diffTime / (1000 * 3600 * 24)
            let newTime = Math.round(difference)
           
            //Holds all the Posts temporarly. Used for filtering out duplicates
            let tempPost: Array<Post> = []

            //A standard Post object. This is used toughout the application to store questions -> Posts
            let Post : Post = {
               UserName: userData.UserName,
               UserId: userData._id,
               ProfileImage: userData.ProfileImage,
               CategoryId: qst.Categoryid,
               Category: data.Name,
               QuestionId: qst._id,
               Title: qst.Title,
               Body: qst.Body,
               Tags: qst.Tags,
               PostDate: newTime,
               isBlocked: qst.isBlocked,
               NumberOfComments: qst.Comments.length,
               Votes: qst.Votes,                

            }
            //Add the post to the rest - first check if the Post already exists in the State. This is to filter out duplicates
            if(!tempPost.includes(Post)){
                tempPost.push(Post)
            }
            setPosts([...tempPost, Post])
            
        })

} 

fetchData()

}, [])
    return(
        <>
            <h2>Posts by Category</h2>
            {posts && (
                <Card posts={posts} />
            )}
            
        </>
    )
}

export default Category