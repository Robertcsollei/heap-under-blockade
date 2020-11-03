import React from 'react'
import { useForm } from 'react-hook-form';

import { resComment} from '../../../interfaces'
function Answer(props: any){ 
const { register, handleSubmit, errors } = useForm(); // initialize the hook


const onSubmit = async (data: resComment) => {
    let newComment = {
        ...data,
        images: [],
        user_id: "5f9faa3211557067b44addad",
    }

    let URL =  `${process.env.REACT_APP_API}/comment/${props.currentId}`;
    let res = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    });
    console.log(res)
    props.setCounter([1])

};


    return( 
        
         <form onSubmit={handleSubmit(onSubmit)} className="answer">
                <label>Show the world what can you do. Answer this question if you can</label>
                <input className="title" name="title" ref={register} type="text" placeholder="Add title to your answer"></input>
                <textarea className="textField" name="body" ref={register} placeholder="enter you answer here"></textarea>
                
                <input type="submit" className="submit" value="Submit" />
            </form>

    )
}


export default Answer