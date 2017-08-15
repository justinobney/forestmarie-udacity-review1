import React from "react";
import toastr from "toastr";
import Header from "./Header";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class MainContainer extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  bookShelfChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let books = this.state.books.filter(x => x.id !== book.id);

      if (shelf === "none") {
        this.setState({ books: books });
      } else {
        this.setState({ books: [...books, { ...book, shelf }] });
      }

      toastr.info(
        `${book.title} was ${shelf === "none" ? "removed" : "updated"}!`
      );
    });
  };

  render() {
    let books = this.state.books;
    let readBooks = books.filter(x => x.shelf === "read");
    let wantToReadBooks = books.filter(x => x.shelf === "wantToRead");
    let readingBooks = books.filter(x => x.shelf === "currentlyReading");

    return (
      <div className="list-books">
        <Header headerText="Book ManagR" />
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={readingBooks}
              display="Currently Reading"
              onBookShelfChanged={this.bookShelfChanged}
            />
            <Bookshelf
              books={wantToReadBooks}
              display="Want to Read"
              onBookShelfChanged={this.bookShelfChanged}
            />
            <Bookshelf
              books={readBooks}
              display="Read"
              onBookShelfChanged={this.bookShelfChanged}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainContainer;
