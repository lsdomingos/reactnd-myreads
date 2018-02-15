import React, { Component } from 'react'
import BookItem from '../components/bookItem'
import { Link } from 'react-router-dom'

import '../App.css'

class Home extends Component {

    componentDidMount() {

    }

    render() {
        const bookShelfCategories = this.props.bookShelfCategories
        return (
            <div className="bookshelf">
                {Object.keys(bookShelfCategories).map((bookShelfTitle) => (
                    <div key={bookShelfCategories[bookShelfTitle]}>
                        <div key={bookShelfCategories[bookShelfTitle]} className="bookshelf-title">
                            <h1>{bookShelfCategories[bookShelfTitle]}</h1>
                        </div>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.bookList.map((book) => (bookShelfCategories[book.shelf] === bookShelfCategories[bookShelfTitle] &&
                                    <div key={book.id}>
                                        <BookItem key={book.id} book={book} shelves={bookShelfCategories} updateData={this.props.updateData} />
                                    </div>
                                ))}

                            </ol>
                        </div>
                    </div>
                ))}
                <div className="open-search">
                    <Link to="/search">Add books</Link>
                </div>
            </div>

        )
    }
}

export default Home