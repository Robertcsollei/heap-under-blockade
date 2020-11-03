import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';

import { Categories, resQuestion} from '../../../interfaces'

function NewPost() {
const { register, handleSubmit, errors } = useForm(); // initialize the hook
const [categories, setCategories] = useState<Array<Categories>>()
const [visible, setVisible] = useState(false)
    
const onSubmit = async (data: any, e:any) => {
    //creates new object on submit and sends it to the server
    data.tags = data.tags.split(",")
    let newPost = {
        ...data,
        images: [],
        user_id: "5f9faa3211557067b44addad",
    }
    console.log(newPost)

    let URL =  `${process.env.REACT_APP_API}/question`;
    let res = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    });
    console.log(res)

    //makes the modal visible
    setVisible(v => v = true)

    //resets the form
    e.target.reset()

};

useEffect(() => {

    async function fetchData() {
        
    let categories = `${process.env.REACT_APP_API}/category`
    const response = await fetch(categories);
    const data = await response.json();
    setCategories(data)
    }
    
    fetchData()
}, [])

function hideConf() {
    setVisible(v => v = false)
}
    return(
        <>
         <h2>Create new Post</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="answer">
                <label>If you are in trouble with a technical issue feel free to ask around here. We have a very helpful community</label>
                <input className="title" name="title" ref={register} type="text" placeholder="Add title to your question"></input>
                <textarea className="textField" name="body" ref={register} placeholder="Explain your problem"></textarea>
                <input className="title" name="tags" ref={register} type="text" placeholder="Add tags, separate them by a comma (,)"></input>
                <label>Here you can choose a category for your project</label>
                <select name="category_id" id="categoryId" ref={register}>
                    {categories && (
                        categories.map((cat, index) => {
                            return <option key={index} value={`${cat._id}`}>{cat.Name}</option>
                        })
                    )}
                </select>
                <input type="submit" className="submit" value="Submit" />
            </form>
            <div onClick={hideConf} className={visible ? 'confiramtion' : 'hide'}>
                <h4>Your question has been submitted</h4>
                <p>click to close</p>
            </div>
        </>
    )
}

export default NewPost