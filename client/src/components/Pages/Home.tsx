import  React, {useState, useEffect} from 'react'


import {Questions,  Post} from '../../interfaces'

import Card from '../Shared/Card/Card'

function Home(){
    const [posts, setPosts] = useState<Array<Post>>([])

    useEffect(() => { 
        
        const fetchData = async () => {
          //Get all questions
          const url = `${process.env.REACT_APP_API}/question`;
          const response = await fetch(url);
          const data = await response.json();

            //array to filter out duplicates
            let tempQst: Array<Post> = []
         data.map(async (getQuestionDetails: Questions) => {
             //For each question get the category and the User
             const catUrl = `${process.env.REACT_APP_API}/category/${getQuestionDetails.Categoryid}`
             const userUrl = `${process.env.REACT_APP_API}/user/${getQuestionDetails.UserId}`

             const CatRes = await fetch(catUrl)
             const catData = await CatRes.json()

             const userRes = await fetch(userUrl)
             const userData = await userRes.json()
            
            //type conflict explained in Category.tsx -> 31 - 32 
            //@ts-ignore
            let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(getQuestionDetails.PostDate)).getTime())
            let difference =  diffTime / (1000 * 3600 * 24)
            let newTime = Math.round(difference)

             let Post : Post = {
                UserName: userData.UserName,
                UserId: userData._id,
                ProfileImage: userData.ProfileImage,
                CategoryId: getQuestionDetails.Categoryid,
                Category: catData.Name,
                QuestionId: getQuestionDetails._id,
                Title: getQuestionDetails.Title,
                Body: getQuestionDetails.Body,
                Tags: getQuestionDetails.Tags,
                PostDate: newTime,
                isBlocked: getQuestionDetails.isBlocked,
                NumberOfComments: getQuestionDetails.Comments.length,
                Votes: getQuestionDetails.Votes                

             }
             //explained in Category.tsx -> 58
             if(!tempQst.includes(Post)){
                tempQst.push(Post)
            }
             setPosts(oldComments => [...tempQst].sort((a,b) => {return b.Votes - a.Votes}))
             
         })
        }; 
        fetchData();
        
      }, []); 
      
    return(
        
        <>
 <h2>All Posts</h2>
        
        {/* Card object are reused troughout the app for displaying posts */}
        {posts && (
            
            <Card posts={posts} />

        )}
        </>
    )
}

export default Home;