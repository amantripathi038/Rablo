import React, { useState } from 'react';
import './style.css'
import axios from 'axios'
import qs from 'qs'

function AddBook() {
    const [name, setName] = useState(null);
    const [isbn, setISBN] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(null);
    const [counterOfOrigin, setCounterOfOrigin] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(null);
    const [year, setYear] = useState(null);
    const [stockAvailable, setStockAvailable] = useState(null);
    const [digitalFormatAvailable, setDigitalFormatAvailable] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "isbn") {
            setISBN(value);
        }
        if (id === "author") {
            setAuthor(value);
        }
        if (id === "price") {
            setPrice(value);
        }
        if (id === "counterOfOrigin") {
            setCounterOfOrigin(value);
        }
        if (id === "year") {
            setYear(value);
        }
        if (id === "numberOfPages") {
            setNumberOfPages(value);
        }
        if (id === "stockAvailable") {
            setStockAvailable(value);
        }
        if (id === "digitalFormatAvailable") {
            setDigitalFormatAvailable(!digitalFormatAvailable);
        }
    }

    const handleSubmit = () => {
        console.log(name, isbn, author, price, counterOfOrigin, numberOfPages, year, stockAvailable, digitalFormatAvailable);
        if (!name) {
            window.alert("Enter proper Book Name.")
            return
        }
        if (!isbn) {
            window.alert("Enter proper ISBN.")
            return
        }
        if (!author) {
            window.alert("Enter proper Author Name.")
            return
        }
        if (!price) {
            window.alert("Enter proper Price.")
            return
        }
        if (price) {
            if (parseInt(price, 10).toString() !== price) {
                window.alert("Enter proper Price.")
                return
            }
            if(parseInt(price, 10) < 1){
                window.alert("Price must be greater than 0.")
                return
            }
        }
        if (numberOfPages) {
            if(parseInt(numberOfPages,10).toString() !== numberOfPages) {
                window.alert("Enter proper Number of Pages.")
                return
            }
            if(parseInt(numberOfPages, 10) < 1){
                window.alert("Number of Pages must be greater than 0.")
                return
            }
        }
        if(!year){
            window.alert("Enter Year")
            return
        }
        if(year){
            if(parseInt(year,10).toString() !== year) {
                window.alert("Enter proper Year.")
                return
            }
            var x = parseInt(year, 10)
            if(x < 1500 || x > 2022){
                window.alert("Year must be in range [1500, 2022]")
                return
            }
        }
        if(!stockAvailable){
            window.alert("Enter Stock Available.")
            return
        }
        if (stockAvailable){
            if(parseInt(stockAvailable,10).toString() !== stockAvailable) {
                window.alert("Enter proper Stock.")
                return
            }
            if(parseInt(stockAvailable, 10) < 0){
                window.alert("Stock must be greater than equal to 0.")
                return
            }
        }
        const url = "https://glacial-mesa-64364.herokuapp.com/addBook"
        axios.post(url, qs.stringify({
            'name': name,
            'isbn': isbn,
            'author': author,
            'price': price,
            'counterOfOrigin': counterOfOrigin,
            'numberOfPages': numberOfPages,
            'year': year,
            'stockAvailable': stockAvailable,
            'digitalFormatAvailable': digitalFormatAvailable
        })).then(function (response) {
            console.log(response)
            window.alert("Book added successfully.")
        }).catch(function (error) {
            const s = error.response.status
            console.log(error.response)
            if (s === 409) {
                window.alert("Book already exist.")
            }
        });
    }

    return (
        <div className="form">
            <div className="form-body">
                <div className="bookname">
                    <label className="form__label" htmlFor="name">Book Name </label>
                    <input className="form__input" type="text" id="name" placeholder="Book Name" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="isbn">
                    <label className="form__label" htmlFor="isb">ISBN </label>
                    <input type="text" name="" id="isbn" className="form__input" placeholder="ISBN" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="author">
                    <label className="form__label" htmlFor="author">Author Name </label>
                    <input type="text" id="author" className="form__input" placeholder="Author Name" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="price">
                    <label className="form__label" htmlFor="price">Price </label>
                    <input className="form__input" type="text" id="price" placeholder="Price" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="counterOfOrigin">
                    <label className="form__label" htmlFor="counterOfOrigin">Counter Of Origin </label>
                    <input className="form__input" type="text" id="counterOfOrigin" placeholder="Counter Of Origin" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="numberOfPages">
                    <label className="form__label" htmlFor="numberOfPages">Number Of Pages </label>
                    <input className="form__input" type="text" id="numberOfPages" placeholder="Number Of Pages" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="year">
                    <label className="form__label" htmlFor="year">Year </label>
                    <input className="form__input" type="text" id="year" placeholder="Year" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="stockAvailable">
                    <label className="form__label" htmlFor="stockAvailable">Stock Available </label>
                    <input className="form__input" type="text" id="stockAvailable" placeholder="Stock Available" onChange={(e) => handleInputChange(e)} />
                </div>
                <div className="digitalFormatAvailable">
                    <label className="form__label" htmlFor="digitalFormatAvailable"> Digital Format Available </label>
                    <input className="form__input" type="checkbox" id="digitalFormatAvailable" onChange={(e) => handleInputChange(e)} />
                </div>
            </div>
            <div className="footer">
                <button type="submit" className="btn btn-lg btn-dark" onClick={() => handleSubmit()}>Add Book</button>
            </div>
        </div>
    )
}
export default AddBook;