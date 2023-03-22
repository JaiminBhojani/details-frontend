import  { useState } from 'react'
import SubmitContext from './SubmitContext'
const REACT_APP_URL = process.env.REACT_APP_URL;

const SubmitState = (props) => {
    const host =  REACT_APP_URL;

    // const [details,setDetails] = useState(productinitial);
    const[details,setDetails] = useState(dinitial);

    const fetchalldetail = async () => {

        const response = await fetch(`${host}/api/fetchalldetail`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        const json = await response.json();
        setDetails(json);
        // console.log(json)
    }

    const adddetail = async (name, phone, email,hobby) => {

        const response = await fetch(`${host}/api/adddetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, phone, email,hobby})
        });

        const note = await response.json();
        console.log(note);
        
        setDetails(details.concat(note));
    }

    const deletedetail = async (id) => {
        const response = await fetch(`${host}/api/deletedetail/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = response.json();
        console.log(json)



        console.log(id);
        const newnotes = details.filter((details) => { return details._id !== id })
        // setNotes(newnotes);
        setDetails(newnotes);
    }

    const updatedetail = async (id, name, phone, email,hobby) => {

        const response = await fetch(`${host}/api/updatedetail/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, phone, email,hobby})
        });
        const json = response.json();
        console.log(json);


        for (let index = 0; index < details.length; index++) {
            const el = details[index];
            if (el._id === id) {
                el.name = name;
                el.phone = phone;
                el.email = email;
                el.hobby = hobby;
            }
        }
    }


  return (
    <div>
      <SubmitContext.Provider value={{details , fetchalldetail , adddetail , deletedetail , updatedetail}}>
        {props.children}
      </SubmitContext.Provider>
    </div>
  )
}

export default SubmitState;
