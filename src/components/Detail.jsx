// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useFirebase } from '../context/firebase';

// function Detail() {
//     const params = useParams(); 
//     const firebase = useFirebase();
//     const [book, setBook] = useState(null);

//     useEffect(()=>
//     {
//         firebase.getBook(params.bookId).then(value=>console.log(value));
//     },[])

//     console.log(params.bookId);
//     return ( 
//        <div>
//         <h1>Detail</h1>
//        </div>
//     );
// }

// export default Detail;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';

function Detail() {
    const { bookId } = useParams(); // Extract bookId from params
    const { getBook } = useFirebase(); // Destructure getBook function
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const firebase=useFirebase();
    useEffect(() => {
        if (!bookId) return;
        const fetchBook = async () => {
            setLoading(true);
            const bookData = await firebase.getBooksByUserId(bookId);
            setBook(bookData);
            setLoading(false);
        };

        fetchBook();
    }, [bookId, getBook]); // Added dependencies

    console.log("yes ",book);

    return (
        <div>
            <h1>Book Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : book ? (
                <div>
                    <h2>{book.name}</h2>
                    <p>ISBN: {book.isbnNumber}</p>
                    <p>Price: {book.price}</p>
                    <p>Story: {book.story}</p>
                </div>
            ) : (
                <p>Book not found.</p>
            )}
        </div>
    );
}

export default Detail;