import React, { useEffect,useState} from 'react'
import profile from '../assest/profile2.jpg';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const navigate=useNavigate();

  const [userData,setUserData]=useState({});
  console.log("🚀 ~ file: About.js ~ line 8 ~ About ~ userData", userData)
  const checkUser = async () => {
    try {
      const res = await fetch("/about", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data=await res.json();
      console.log(data);
      setUserData(data);
     if(!res.status === 200){
      const error =new Error(res.error);
      throw error
     }
    } catch (error) {
      console.log(error);
   navigate('/login')
      
    }
   
  }
  useEffect(() => {
    checkUser();
  }, [])

  return (
    <>

      <div className="container" >
        <form method='GET'>
          <div className="row pt-5">
            <div className="col-md-4 col-sm-6">
              <img src={profile} alt="raza" class="img-thumbnail" />
              <h6 className='mt-3'>Work Link</h6>
              <a href="https://github.com/abubakarraza64" style={{ textDecoration: 'none' }} target='blank'>GitHub</a>
            </div>
            <div className="col-md-6 col-sm-8 pt-5">
              <h2>{userData.name}</h2>
              <p style={{ color: "#41558C" }}>Web Developer</p>
              <div className="row mt-5 pt-5">
                <h2>About</h2>
                <div className="col-6">

                  <h5 className='mt-5'>User Id:</h5>
                  <h5 className='mt-3'>Name:</h5>
                  <h5 className='mt-3'>E-mail:</h5>
                  <h5 className='mt-3'>Phone:</h5>
                </div>
                <div className="col-6">
                  <h5 className='mt-5' style={{ color: "#41558C" }}>{userData._id}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.name}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.email}</h5>
                  <h5 className='mt-3' style={{ color: "#41558C" }}>{userData.phone}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-4">
              <button type="button" className="btn btn-secondary">Edit Profile</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About
