import './DeleteBook.scss';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  if(loading) return <Loader />

  const handleDeleteBook = () => {
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false);
      navigate('/');
    })
    .catch((err) => {
      alert('something went wrong');
      console.log(err);
    })
  }

  return (
    <div className="delete-book">
      <h1>Delete Book</h1>
      <div className="delete-book-1">
        <p>Are You sure, you want to delete the book?</p>
        <button onClick={handleDeleteBook}>YES, Delete it.</button>
      </div>
    </div>
  )
}

export default DeleteBook
