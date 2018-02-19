import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';
import BookItem from '../components/bookItem';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
  timer = null
  timer2 = null

  state = {
    query: '',
    searchResults: []
  }

  componentWillReceiveProps() {
    this.getBooks(this.state.query)
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.getBooks(query)
  }

  getBooks(query) {
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
    this.timer = setTimeout(() => {
      let books = this.props.bookList;
      query = query.toLowerCase().trim()
      if (query) {
        BooksAPI.search(query).then(
          res => {
            if (res) {
              const bookList = res.error ? [] : res.filter(book => {
                books.map(item => {
                  if (item.id !== book.id) {
                    return book;
                  } else {
                    book.shelf = item.shelf;
                    book.isDisabled = true;
                    return book;
                  }
                })
                if (book && book.authors && book.hasOwnProperty('imageLinks') && book.imageLinks.smallThumbnail) {
                  const match = new RegExp(escapeRegExp(query), 'i')
                  return match.test(book.authors) || match.test(book.title) ? book : false
                } else {
                  return false
                }
              });

              this.setState({
                searchResults: bookList
              })
            }
          }
        )
      }
    }, 300);

    this.timer2 = setTimeout(() => {
      if (query === '' || !query) {
        this.setState({
          searchResults: []
        })
        return false
      }
    }, 400)

  }

  render() {

    const { bookShelfCategories } = this.props;
    const { query, searchResults } = this.state;

    if (searchResults && searchResults.length > 0) {
      searchResults.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={() => { window.history }} className='close-search'> back </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by term"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Search results</h2>
            {

              searchResults.length === 0 && query !== '' && (
                <p>
                  No results retrieved for <b>"{query}"</b>. Try another term.
                </p>
              )
            }
            {
              searchResults.length === 0 && (
                <div>
                  <p>Try searching for:</p>
                  <p><b>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</b></p>
                </div>
              )
            }

            {
              searchResults && searchResults.length > 0 && (

                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      searchResults.map((book) => (
                        <li key={book.id}>
                          <BookItem key={book.id} book={book} shelves={bookShelfCategories} updateData={this.props.updateData} isDisabled={book.isDisabled} />
                        </li>
                      ))
                    }
                  </ol>
                </div>
              )
            }
          </div>

        </div>
      </div>
    )
  }
}


export default Search;