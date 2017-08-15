import React from "react";
import toastr from "toastr";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import _ from "lodash";

class BooksContainer extends React.Component {
  state = {
    books: []
  };

  constructor() {
    super();
    this.updateQuery = _.debounce(this.updateQuery, 677);
  }

  getBookShelf = bookId => {
    return BooksAPI.get(bookId).then(book => {
      return book.shelf;
    });
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      toastr.info(`${book.title} was added to ${shelf}!`);
    });
  };

  updateQuery = searchString => {
    if (!searchString) {
      this.setState({ books: [] });
      return;
    }

    BooksAPI.search(searchString, 50).then(books => {
      this.setState({ books: [...books] });
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 &&
              this.state.books.map(x =>
                <li key={x.id}>
                  <Book
                    id={x.id}
                    title={x.title}
                    previewLink={x.previewLink}
                    onGetBookShelf={this.getBookShelf}
                    onBookShelfChanged={this.updateBook}
                    authors={x.authors}
                    imageLinks={x.imageLinks}
                    removeable={false}
                  />
                </li>
              )}
            {this.state.books.length === 0 && <div>No results. =(</div>}
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksContainer;
