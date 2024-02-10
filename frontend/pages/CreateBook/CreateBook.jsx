import { useState } from 'react';
import './CreateBook.scss';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';

const CreateBook = () => {

  const bookDetails = {
    title: null,
    author: null,
    publishYear: null,
  }

  const [book, setBook] = useState(bookDetails);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    console.log(book);
    setLoading(true);
    axios.post('http://localhost:5555/books', book)
    .then(() => {
      setLoading(false);
      navigate('/');
    })
    .catch((err) => {
      setLoading(false);
      alert('Something went wrong');
      console.log(err);
    })
  }  

  if(loading) return <Loader />

  return (
    <div className="create-book">
      <h1>Create Books</h1>
      <div className="create-book-1">
        <label>Title</label>
        <input type="text" onChange={(e) => {
            setBook({...book, title: e.target.value})
          }} />
        <label>Author</label>
        <input type="text"  onChange={(e) => {
            setBook({...book, author: e.target.value})
          }} />
        <label>publishYear</label>
        <input type="number" onChange={(e) => {
            setBook({...book, publishYear: e.target.value})
          }}  />
        <button 
          className="create"
          onClick={handleSaveBook}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default CreateBook;