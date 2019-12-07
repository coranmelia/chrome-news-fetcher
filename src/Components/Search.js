import React from 'react';
import PropTypes from "prop-types";
import "./Search.css"
import 'font-awesome/css/font-awesome.min.css';

class Search extends React.Component{

    constructor(props){
        super(props);
        const search = this.props.searchTerm;
        this.state = {
            search: search,
        };
        // console.log(search);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // set state to user input
    handleChange(event) {
        // state changes fire with any input letter
        this.setState({
            search: event.target.value
        });
        // console.log(this.state.search);
    }

    // get parent method
    searchTerm(query) {
        this.props.searchTerm(query);
    };

    // submit input
    handleSubmit(event) {
        this.setState({
            search : ""
        });
        const query = this.state.search;
        this.searchTerm(query);
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={ this.handleSubmit } >
                <input type="text" value={ this.state.search } onChange={ this.handleChange } className={'input'}/>
                <button type="submit" className={'submit'}>
                    <i className="fa fa-search"></i>
                </button>
            </form>
        );
    }
}


Search.propTypes = {
    searchTerm: PropTypes.func.isRequired
};

export default Search;
