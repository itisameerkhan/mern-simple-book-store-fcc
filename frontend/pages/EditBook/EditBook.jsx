import { useState } from 'react';
import './EditBook.scss';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBook = () => {

  const bookDetails = {
    title: null,
    author: null,
    publishYear: null,
  }

  const [book, setBook] = useState(bookDetails);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  console.log('book', book);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res) => {
      setLoading(false);
      setBook({
        title: res.data.title,
        author: res.data.author,
        publishYear: res.data.publishYear,
      });
    })
    .catch((err) => {
      alert('something went wrong');
      console.log(err);
    })
  },[])

  const handleEditBook = () => {
    console.log(book);
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, book)
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
        <input type="text" 
          value={book.title}
          onChange={(e) => {
            setBook({...book, title: e.target.value})
          }} />
        <label>Author</label>
        <input type="text"  
          value={book.author}
          onChange={(e) => {
            setBook({...book, author: e.target.value})
          }} />
        <label>publishYear</label>
        <input type="number" 
            value={book.publishYear}
            onChange={(e) => {
            setBook({...book, publishYear: e.target.value})
          }}  />
        <button 
          className="create"
          onClick={handleEditBook}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default EditBook;