import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import BookItem from '../components/bookItem';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {

  state = {
    query: '',
    searchResults: []
  }

  constructor() {
    super();
  }

  updateQuery = (query) => {
    this.setState({ query: query.toLowerCase() })
    this.getBooks(query)
  }

  getBooks(query) {
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      let books = this.props.bookList;
      if (query === '' || !query) {
        this.setState({
          searchResults: []
        })
        return
      }
      BooksAPI.search(query).then(
        res => {
          if (res) {
            const bookList = res.error ? [] : res.map(book => {
              books.map(item => {
                if (item.id !== book.id) {
                  return book;
                }else{
                  book.shelf = item.shelf;
                  book.isDisabled = true;
                  return book;
                }
              })
              return book;
            });
  
            this.setState({
              searchResults: bookList
            })
          }
        }
      )
      this.render()
    }, 300);
 
  }

  render() {

    const { bookList, bookShelfCategories } = this.props;
    const { query, searchResults } = this.state;

    if (searchResults && searchResults.length > 0) {
      searchResults.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={() => { window.history }} className='close-search'> back </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
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
                          <BookItem key={book.id} book={book} shelves={bookShelfCategories} updateData={this.props.updateData} isDisabled={book.isDisabled}/>
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