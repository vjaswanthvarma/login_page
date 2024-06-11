import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login(){
   var [data,setdata]=useState({email:'',password:''});
   var navigate=useNavigate();
    async function checkuser(e){
        e.preventDefault();
        var json=JSON.stringify(data);
        try{
        await axios.post("http://localhost:8000/userlogin",json).then((res)=>{ 
           if(res.data.status==="true"){
                navigate("/signup")
            }
            else{
                alert("Please Enter valid input")
            }

        })
    }
        catch(e){
            console.log(e);
        }
    }
    //setdata({email:e.target.value,password:data.password})
    //setdata({email:data.email,password:e.target.value});
    return(<>
        <nav>
        <a href="#"><img src="netflixlogo.jpg" alt="logo" /></a>
    </nav>
    <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={checkuser}>
            <div className="form-control">
                <input type="text" required  onChange={(e)=>{
                    setdata({email:e.target.value,password:data.password})
                }}/>
                <label>Email or phone number</label>
            </div>
            <div className="form-control">
                <input type="password" required  onChange={(e)=>{
                    setdata({email:data.email,password:e.target.value});
                }}/>
                <label>Password</label>
            </div>
            <button type="submit">Sign In</button>
        </form>
        <p>New to Netflix? <a href="/signup">Sign up now</a></p>
        <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
            <a href="#">Learn more.</a>
        </small>
    </div>
    </>)
}