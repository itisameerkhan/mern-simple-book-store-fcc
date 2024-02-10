import { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getData = async() => {
      const data = await fetch('http://localhost:5555/books');
      const json = await data.json();
      setBooks(json);
    }
    getData();
  },[]);

  return (
    <div className="home">
      <h1 className='title'>Books</h1>
      <table className='books-table'>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Published Year</th>
          <th>Operations</th>
        </tr>
        {books?.data.map((val, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{val?.title}</td>
            <td>{val?.author}</td>
            <td>{val?.publishYear}</td>
            <td className='operations'>
            <Link to={`/books/details/${val._id}`}>
              <span className="material-symbols-outlined">info</span>
            </Link>
            <Link to={`/books/edit/${val._id}`}>
              <span className="material-symbols-outlined">edit</span>
            </Link>
            <Link to={`/books/delete/${val._id}`}>
              <span className="material-symbols-outlined">delete</span>
            </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Home