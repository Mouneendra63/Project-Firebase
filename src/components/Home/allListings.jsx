import React, { useEffect, useState} from 'react';
import { useFirebase } from '../../context/firebase';
import { Link ,useNavigate} from 'react-router-dom';
function allListings() {
    const [data,setData]=useState([]);
    const firebase=useFirebase();
    useEffect(()=>
    {
        const db=firebase.getAllbooks().then(books =>setData(books.docs));
    },[]);
    const navigate=useNavigate();
    return ( 
        <div className="container mt-4">
            <div className="row justify-content-center g-4">
                {data.map((item, index) => {
                    const book = item.data();
                    return (
                        <div key={index} className="col-md-4">
                            <div className="card shadow-lg border-0">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{book.name}</h5>
                                    <h6 className="card-subtitle text-muted">💰 Price: {book.price}</h6>
                                    <p className="card-text mt-2">
                                        <strong>ISBN:</strong> {book.isbnNumber}
                                    </p>
                                    <p className="card-text">{book.story}</p>
                                    <p className='card-text'>
                                        <strong>User_ID: { book.userId}</strong>
                                    </p>
                                    <button className="btn btn-primary w-100 mt-3" onClick={e=>navigate(`/book/view/${book.userId}`)}>More Details</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
     );
}

export default allListings;