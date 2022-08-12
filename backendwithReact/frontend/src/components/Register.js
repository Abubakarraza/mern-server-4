import React, { useState } from 'react';
import validator from "validator";
import 'bootstrap/dist/css/bootstrap.css'
import { BsFillPersonFill, BsEnvelopeFill, BsKeyFill, BsFillTelephoneFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [check, setCheck] = useState("");
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
       
        if (!name || !email || !password || !cpassword){
           alert('please type all field')}
         if(!validator.isEmail(email)){
          return  window.alert("please Type valide email")
         }  

        if (password !== cpassword) {
            return setCheck(true);
        }

        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name:name,
              email:email,
              phone:phone,
              password:password
            })
        });
        const data= await response.json();
        console.log(data.status)
        if(data.status === 422 || data.status == 500 || !data){
           return  window.alert('invalid Registration');
        
        }
        if(data.status == 201){
      
         window.alert(data.message);
         navigate('/login')
         console.log(data.message);
        }
       
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setPhone('')
        //
    }

    return (
        <>
            <section className="vh-100" style={{ marginTop: "20px" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form method='POST'  className="mx-1 mx-md-4" onSubmit={onSubmitHandler}>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsFillPersonFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsEnvelopeFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsFillTelephoneFill style={{ height: "25px", width: "25px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="number" id="form3Example4c" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                                        <label className="form-label" for="form3Example4c">Phone</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsKeyFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example5c" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                                        <label className="form-label" for="form3Example5c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <BsKeyFill style={{ height: "30px", width: "30px", marginBottom: "25px" }} className="fas  fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control" value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} />
                                                        <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>

                                                {
                                                    check ?
                                                        <div className='d-flex justify-content-center' style={{ color: "red" }}>
                                                            password is not match
                                                        </div>
                                                        :
                                                        <div className='d-flex justify-content-right' style={{ color: "green" }}>

                                                        </div>
                                                }

                                                <div className="form-check d-flex justify-content-center mb-5">

                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />

                                                    <label className="form-check-label" for="form2Example3">
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type='submit' className="btn btn-primary btn-lg" onClick={onSubmitHandler}>Register</button>


                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <span>Already have an account <NavLink to='/login'><span>Login</span></NavLink></span>




                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
