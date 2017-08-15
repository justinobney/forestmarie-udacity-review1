import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  state = {
    shelfSelection: ""
  };

  // Note: When the book component is used from the main bookshelf container, the shelf
  // is present as the getAll method has the shelf.  When you're just doing
  // a search, the shelf doesn't exist so I'm fetching it.
  //
  //A more performant approach would be to make one call to getAll in the BooksContainer
  // component and synchronization the shelves there but this is more about learning how
  // child components receive props from parent components.
  componentDidMount() {
    if (this.props.shelf) {
      this.setState({ shelfSelection: this.props.shelf });
    } else {
      this.props.onGetBookShelf(this.props.id).then(bookShelf => {
        this.setState({ shelfSelection: bookShelf });
      });
    }
  }

  updateShelf = event => {
    let shelf = event.target.value;
    let book = {
      id: this.props.id,
      title: this.props.title,
      authors: this.props.authors,
      imageLinks: this.props.imageLinks,
      previewLink: this.props.previewLink,
      shelf: this.state.shelfSelection
    };

    this.setState({ shelfSelection: shelf });
    this.props.onBookShelfChanged(book, shelf);
  };

  render() {
    let authors = this.props.authors || [];
    let backgroundImage;

    if (this.props.imageLinks) {
      backgroundImage = this.props.imageLinks.thumbnail;
    } else {
      // Hack here - I'm passing in an invalid id to get a standard 'No Image Available' photo as
      // there are a few books coming back with no imageLinks.
      backgroundImage =
        "https://books.google.com/books/content?id=invalidId&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
    }
    return (
      <div className="book">
        <div className="book-top">
          <a href={this.props.previewLink} target="_blank">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${backgroundImage})`
              }}
            />
          </a>
          <div className="book-shelf-changer">
            <select
              value={this.state.shelfSelection}
              onChange={this.updateShelf}
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              {this.props.removeable && <option value="none">None</option>}
            </select>
          </div>
        </div>
        <div className="book-title">
          {this.props.title}
        </div>
        <div className="book-authors">
          {authors.map(x =>
            <div key={x}>
              {x}
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.object,
  shelf: PropTypes.string,
  title: PropTypes.string.isRequired,
  onBookShelfChanged: PropTypes.func.isRequired,
  onGetBookShelf: PropTypes.func,
  previewLink: PropTypes.string.isRequired,
  removeable: PropTypes.bool
};

export default Book;
