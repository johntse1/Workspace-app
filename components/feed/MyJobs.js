import axios from 'axios';
import React from 'react'
import Button from 'react-native';


function MyJobs(props){
    const displayTitle = () =>{
        console.log(props)
    }

    const removeJob = () =>{
        let url = 'https://workspace.onrender.com/api/jobs/delete/' + props.post._id
        let token = localStorage.getItem("JWT_TOKEN")
        axios.delete(url, { headers: { "Authorization": `Bearer ${token}` } }).then(function (response) {
            console.log(response)
            props.setRequestData(new Date());
          }).catch(function (error) {
            console.log(error)
        })
        return <Redirect to='/'></Redirect>

    }
    const completeJob = () =>{
        let token = localStorage.getItem("JWT_TOKEN")
        axios.post('https://workspace.onrender.com/api/jobs/complete/' + props.post._id,
            {
            },{ headers: { "Authorization": `Bearer ${token}` } })   
        .then( function (response){
          console.log(response.data)
          toast.dark("Job Completed")
        }).catch(function (error){
          console.log(error.response.status)
          toast.error("Job failed to complete")
        });
      }
    let contBool = localStorage.getItem('contractor')
    if(contBool){
      //complete jobs for contractor
      if(props.post.status == 'Complete')
        return(
          <div key={props.post._id}>
            <h1>{props.post.title}</h1>
            <Link to={{pathname: '/otherUser', state: props.post.user}} className='stuff'>{props.post.username}</Link>
            <div>{props.post.text}</div>
            <div>{props.post.price}</div>
            <div>{props.post.status}</div>
            <Link to={{pathname: '/review', state: props.post._id}}><Button text='Review' onClick={displayTitle}></Button></Link>
          </div>)
      //jobs that were accepted and in progress
      if(props.post.status == 'in progress')
        return(
          <div key={props.post._id}>
            <h1>{props.post.title}</h1>
            <div>{props.post.user}</div>
            <div>{props.post.text}</div>
            <div>{props.post.price}</div>
            <div>{props.post.status}</div>
            <Button text='Mark as Complete' onClick={completeJob}></Button>
            <ToastContainer/>
          </div>)
      else
      {
        return(
        <div key={props.post._id}>
            <h1>{props.post.title}</h1>
            <div>{props.post.user}</div>
            <div>{props.post.text}</div>
            <div>{props.post.price}</div>
            <div>{props.post.status}</div>
            <Button text='Remove Job' onClick={removeJob}></Button>
        </div>
        )
      }
    }
}