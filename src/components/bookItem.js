import React, { Component } from 'react'

class BookItem extends Component {

  render() {
    const { book, shelves, isDisabled } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          {!isDisabled && (
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => this.props.updateData(book, e.target.value)}>
                <option value="none" disabled>Move to...</option>
                {
                  Object.keys(shelves).map((shelf, index) => (
                    <option key={shelf + index} value={shelf} defaultValue={shelf === book.shelf}>
                      {shelves[shelf]}
                    </option>
                  ))
                }
                <option value="none" >None</option>
              </select>

            </div>
          )}

        </div>
        <div className="book-title">
       
        {isDisabled && (
            <div className="book-shelved">
                <h2>Shelved on: {book.shelf}</h2>

            </div>
          )}
        </div>
        {book.title}
        <div className="book-authors">
          {
            book.authors && book.authors.map((author, index) =>
              <span key={index}>{author}</span>
            )
          }
        </div>
      </div>
    )
  }
}

export default BookItem