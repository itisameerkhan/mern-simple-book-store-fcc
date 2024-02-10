import { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://localhost:5555/books");
      const json = await data.json();
      setBooks(json);
    };
    getData();
  }, []);

  if (!books) return <Loader />;

  return (
    <div className="home">
      <div className="home-t">
        <h1 className="title">Books</h1>
        <Link to={"/books/create"}>
          <span className="material-symbols-outlined">add_box</span>
        </Link>
      </div>
      <table className="books-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Operations</th>
          </tr>
        </thead>
        {books?.data.map((val, index) => (
          <tbody key={index}>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.title}</td>
              <td>{val?.author}</td>
              <td>{val?.publishYear}</td>
              <td className="operations">
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
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Home;
