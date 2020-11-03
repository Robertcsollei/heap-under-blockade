import React, {useState, useEffect} from 'react'


import {Categories, Questions, Post} from '../../interfaces'

import Card from '../Shared/Card/Card'

function Category() {
const [posts, setPosts] = useState<Array<Post>>([])

useEffect(() => {
    const fetchData = async () => {
          
        let currentId = window.location.pathname.split("/")[2]
        const url = `${process.env.REACT_APP_API}/category/${currentId}`;
        const response = await fetch(url);
        const data = await response.json();

        let qstUrl = `${process.env.REACT_APP_API}/getQuestions/${currentId}`
        const res = await fetch(qstUrl)
        const qstList = await res.json()
     

        qstList.map(async (qst: Questions) => {
            const userUrl = `${process.env.REACT_APP_API}/user/${qst.UserId}`
            const userRes = await fetch(userUrl)
            const userData = await userRes.json()
            //@ts-ignore
            let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(qst.PostDate)).getTime())
            let difference =  diffTime / (1000 * 3600 * 24)
            let newTime = Math.round(difference)
           
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
            setPosts([...posts, Post])
            
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