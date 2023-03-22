import React, { useContext, useState } from 'react'
import SubmitContext from '../context/submit/SubmitContext';
import validator from 'validator'

export default function Adddetail() {

    const context = useContext(SubmitContext);
    const [note, setNote] = useState({ name: "", phone: "", email: "", hobby: "" })
    const { adddetail } = context;
    const handleclick = (e) => {
        e.preventDefault();
        var email = note.email;

        if (validator.isEmail(email)) {

        } else {
            return (
                alert("Invalid Email")
            )
        }

        if(note.phone>999999999 && note.phone<10000000000){

        }else{
            return (
                alert("Invalid Number")
            )
        }
        adddetail(note.name, note.phone, note.email, note.hobby);
    }
    const onchange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <div>
            <div className="container">
                <form>
                    <div className="head my-4">
                        <h2>Add Details!</h2>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" required id="name" name='name' aria-describedby="emailHelp" onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="phone" name='phone' onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="emailAddress" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onchange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Hobby</label>
                        <input type="text" required className="form-control" id="hobby" name='hobby' onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                    <div className="head">

                    </div>
                </form>
            </div>
        </div>
    )
}
