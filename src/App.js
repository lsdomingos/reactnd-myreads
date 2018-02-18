import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'

import Home from './pages/Home'
import Search from './pages/Search'



class BooksApp extends Component {
  bookShelfCategories = { 'currentlyReading': 'Currently Reading', 'wantToRead': 'Want to read', 'read': 'Read' }
  state = {
    bookList: []
  }
  componentDidMount() {

    this.getallBooks()
  }
  updateData = (book, shelf) => {
    console.log(book, shelf)
    BooksAPI.update(book, shelf).then(
      res => {
        this.getallBooks()
      }
    )
  }

  getallBooks() {
    BooksAPI.getAll().then(
      books => {
        this.setState({ bookList: books })
      }
    )
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>Welcome to My Reads</h1>
          </div>

          <Route exact path='/' render={() => (
            <Home bookList={this.state.bookList} updateData={this.updateData} bookShelfCategories={this.bookShelfCategories} />
          )} />

          <Route exact path='/search' render={() => (
            <Search bookList={this.state.bookList} updateData={this.updateData} bookShelfCategories={this.bookShelfCategories} />
          )} />

        </div>
      </div>
    )
  }
}

export default BooksApp