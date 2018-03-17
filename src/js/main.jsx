import React from 'react';
import ReactDOM from 'react-dom';



class Volume extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         volumeSearched: 1,
         responseLength: 0,
         bookCover: [],
         bookAuthor: [],
         bookTitle: []
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        // this.setState({
        //     volumeSearched: e.target.value,
        // })
    }
    componentDidUpdate(prevProps, prevState) {
            const {volumeSearched} = this.state;
            console.log(volumeSearched)
            if(volumeSearched !== prevState.volumeSearched){
                fetch(`https://www.googleapis.com/books/v1/volumes?q=${volumeSearched}`)
                .then(resp=>{
                    return resp.json();
                })
                .then(data => {
                    let myBookCover = [];
                    let myBookAuthor = [];
                    let myBookTitle= [];
                    let myResponseLength = data.items.length
                    for(let i=1; i < myResponseLength; i++){
                        myBookCover.push(data.items[i].volumeInfo.imageLinks.thumbnail)
                        myBookAuthor.push(data.items[i].volumeInfo.authors)
                        myBookTitle.push(data.items[i].volumeInfo.title)
                    }
                    this.setState({
                        bookCover: myBookCover,
                        bookAuthor: myBookAuthor,
                        bookTitle: myBookTitle,
                        responseLength: myResponseLength
                    })
                    console.log(data.items)
                    console.log('dlugosc tablicy' + data.items.length)
                //    console.log('pozycja 0' + data.items[0].volumeInfo.authors)
                //    console.log('pozycja 1' + data.items[1].volumeInfo.authors)
                //    console.log('pozycja 2' + data.items[2].volumeInfo.authors)
                }
            )
         }

    }

    render(){ 
        let volumeInfo = []
            for(let i=0; i<this.state.responseLength - 1; i++){
                volumeInfo.push(
                    <div className="book-content">
                        <img src={this.state.bookCover[i]}/>
                        <div className="book-title">{this.state.bookTitle[i]}</div>
                        <div className="snippet">{this.state.bookAuthor[i]}</div> 
                    </div>
                )
            }
            console.log('volume info' + volumeInfo)

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
                            <input id="username" name="username" type="text" />
                            <button>Send data!</button>
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

