import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  
  return (
    <div className='show-book'>
    </div>
  )
}

export default ShowBook