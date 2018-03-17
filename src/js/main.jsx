import React from 'react';
import ReactDOM from 'react-dom';



class Volume extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         bookSearched: "",
         responseLength: 0,
         bookCover: [],
         bookAuthor: [],
         bookTitle: []
        }
    }
    //get input on the searched book
    handleSearchChange = (e) => {
        this.setState({
            bookSearched: e.target.value
        })
    }

    //submit button trigers fetching the data from the API
    handleSubmission = (e) =>{
        e.preventDefault();
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.bookSearched}&printType=books&orderBy=newest&maxResults=40`)
                .then(resp=>{
                    return resp.json();
                })
                .then(data => {
                    let itemsCount = data.items.length; 
                    let myBookCover = [];
                    let myBookAuthor = [];
                    let myBookTitle= [];
                    let volumeInfo = []
                    for(let i=0; i < itemsCount - 1; i++){
                        myBookCover.push(data.items[i].volumeInfo.imageLinks.thumbnail)
                        myBookAuthor.push(data.items[i].volumeInfo.authors)
                        myBookTitle.push(data.items[i].volumeInfo.title)
                    }
                    this.setState({
                        responseLength: itemsCount,
                        bookCover: myBookCover,
                        bookAuthor: myBookAuthor,
                        bookTitle: myBookTitle
                    })
                }
            )
    }


    render(){ 
        let volumeInfo = []
            for(let i=0; i<this.state.responseLength - 1; i++){
                volumeInfo.push(
                    
                    <div className="book-content">

                            <div className="bookCover"><img src={this.state.bookCover[i]}/></div>
                            <div className="bookTitle">{this.state.bookTitle[i]}</div>
                            <div className="bookAuthor">{this.state.bookAuthor[i]}</div>
                        
                    </div>
                )
            }

        return (
            <div className="parent">
                <header className="main-header">
                    <div className="container">
                        <h1 className="heading">Book Volumes</h1>
                    </div>
                </header>
                <nav className="main-nav">
                    <div className="container">
                        <form onSubmit={this.handleSearch}>
                            <label htmlFor="username">Enter Book Name</label>
                            <input type="text" placeholder="Book Name"  onChange={this.handleSearchChange}/>
                            <button onClick={this.handleSubmission}>Send data!</button>
                        </form>
                    </div>
                </nav>
                <div className="main-section-results">
                    <div className="container">
                        {volumeInfo}
                        
                    </div>
                </div> 
            </div>

        )

    }
   
}

ReactDOM.render(
    <Volume/>,
    document.getElementById('app')
);

