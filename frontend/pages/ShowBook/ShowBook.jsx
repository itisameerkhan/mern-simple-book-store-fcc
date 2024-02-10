import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './ShowBook.scss';

const ShowBook = () => {

  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getData = async() => {
      const data = await fetch(`http://localhost:5555/books/${id}`);
      const json = await data.json();
      console.log(json);
      setBook(json);
    }
    getData();
  },[]);
  
  if(Object.keys(book).length === 0 && book.constructor === Object) return <Loader />

  return (
    <div className='show-book'>
      <h1 className='title'>Show Book</h1>
      <div className="book-details">
        <div>
          <p className="a">Id</p>
          <p className="b">{book?._id}</p>
        </div>
        <div>
          <p className="a">Title</p>
          <p className="b">{book?.title}</p>
        </div>
        <div>
          <p className="a">Author</p>
          <p className="b">{book?.author}</p>
        </div>
        <div>
          <p className="a">Publish Year</p>
          <p className="b">{book?.publishYear}</p>
        </div>
        <div>
          <p className="a">created At</p>
          <p className="b">{book?.createdAt}</p>
        </div>
        <div>
          <p className="a">updated At</p>
          <p className="b">{book?.updatedAt}</p>
        </div>
      </div>
    </div>
  )
}

export default ShowBook