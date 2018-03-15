import React from 'react';
import ReactDOM from 'react-dom';

class Volume extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         volumeSearched: 1
        }
    }

    handleSearch = (e) => {
        this.setState({
            volumeSearched: e.target.value,
        })
    }

    componentDidMount(){
            fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.volumeSearched)
            .then(resp=>{
                return resp.json();
            })
            .then(data => {
                console.log(data)
            }
            )
        }

    render(){ 
        return (
            <div className="parent">
                <header className="main-header">
                    <div className="container">
                        <h1 className="heading">Book Volumes</h1>
                    </div>
                </header>
                <nav className="main-nav">
                    <div className="container">
                        <input onChange={ this.handleSearch } value={this.state.volumeSearched} />
                    </div>
                </nav>
                <div className="main-section-results">
                    <div className="container">

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