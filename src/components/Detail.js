import React, { useContext, useEffect, useRef, useState } from 'react'
import SubmitContext from '../context/submit/SubmitContext';
import Adddetail from './Adddetail'
// import Detaillist from './Detaillist';

export default function Detail() {

    const context = useContext(SubmitContext);
    const { details, fetchalldetail, updatedetail, deletedetail } = context;
    useEffect(() => {
        fetchalldetail();
    },)

    const ref = useRef(null);

    const [note, setNote] = useState({ id: "", ename: "", ephone: "", eemail: "", ehobby: "" })

    const editdetail = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, ename: currentnote.name, ephone: currentnote.phone, eemail: currentnote.email, ehobby: currentnote.hobby });
    }

    const handleclick = (e) => {
        // console.log(note);
        // refclose.current.click();
        updatedetail(note.id, note.ename, note.ephone, note.eemail, note.ehobby)
        // addnote(note.title, note.description, note.tag);
    }


    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }






    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handleSendEmail = () => {
        const selectedData = details.filter((details) => selectedRows.includes(details._id));
        const body = selectedData.map((details) => {
          return `${details.name} - ${details.phone} - ${details.email} - ${details.hobby}`;
        }).join('\n');
    
        window.location.href = `mailto:info@redpositive.in?subject=Selected Rows&body=${body}`;
      };


    return (
        <div>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Update Details!
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Name</label>
                                <input type="text" value={note.ename} className="form-control" id="ename" name='ename' aria-describedby="emailHelp" onChange={onchange} />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Phone Number</label>
                                <input type="number" maxLength={12} minLength={10} value={note.ephone} className="form-control" id="ephone" name='ephone' onChange={onchange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Email</label>
                                <input type="email" value={note.eemail} className="form-control" id="eemail" name='eemail' onChange={onchange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Hobby</label>
                                <input type="text" value={note.ehobby} className="form-control" id="ehobby" name='ehobby' onChange={onchange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <Adddetail key={details._id}/>



            {details.length === 0 && 'No Details To Display'}
            <div className="row my-3">
                {details.map((details) => {
                    // return <Detaillist key={details._id} editdetail={editdetail} details={details} />;
                    return (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">CB</th>
                                    <th scope="col">S No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope='col'>Email</th>
                                    <th scope='col'>Hobby</th>
                                    <th scope='col'>Delete</th>
                                    <th scope='col'>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={details._id}>
                                    <th scope="row">
                                        {/* <input type="checkbox" checked={selectedRows.includes(details._id)} onChange={() => handleSelectRow(details._id)} /> */}
                                        {/* <input type="checkbox" /> */}
                                        <input type="checkbox" checked={selectedRows.includes(details._id)} onChange={() => handleSelectRow(details._id)} />
                                    </th>
                                    <td>{details._id.slice(15, 24)}</td>
                                    <td>{details.name}</td>
                                    <td>{details.phone}</td>
                                    <td>{details.email}</td>
                                    <td>{details.hobby}</td>
                                    <td><button type="button" className="btn btn-secondary mx-2" onClick={() => { deletedetail(details._id) }} >delete</button></td>
                                    <td><button type="button" className="btn btn-secondary mx-2" onClick={() => { editdetail(details) }}>Update</button></td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
                
                <button type='button' className="container bg-dark btn-dark btn-lg" onClick={handleSendEmail} disabled={selectedRows.length === 0}>Send Email</button>
                
            </div>

        </div>
    )
}
