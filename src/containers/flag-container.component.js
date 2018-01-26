import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryFlagList from '../presentational/flag-list.component';
import Pagination from '../presentational/pagination-component';
import { getCountries, searchCountries, deleteCountry, setCountriesPerPage, setCurrentPage } from '../actions/actions-countries';

class CountryFlagContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_offset: 0
        };
    }

    componentDidMount() {
        this.props.dispatch(setCountriesPerPage(5));
        this.props.dispatch(searchCountries(''));
        this.props.dispatch(getCountries());
    }

    search(event) {
        this.props.dispatch(searchCountries(event.target.value));
        this.props.dispatch(setCurrentPage(1));
        this.setState({start_offset: 0});
    }

    deleteCountry(id) {
        this.props.dispatch(deleteCountry(id));
        const lastPageNumber = Math.ceil((this.props.visibleCountries.length-1) / this.props.countriesPerPage);
        if (this.props.currentPage > lastPageNumber) {
            this.props.dispatch(setCurrentPage(lastPageNumber));
            this.setState({start_offset: (lastPageNumber - 1) * this.props.countriesPerPage});
        }
    }

    chooseCountriesPerPage(event) {
        this.props.dispatch(setCountriesPerPage(event.target.value));
        this.props.dispatch(setCurrentPage(1));
        this.setState({start_offset: 0});
    }

    createArray(perPage) {
        const pagesArray = [];
        for (let i = 1; i <= Math.ceil(this.props.visibleCountries.length / perPage); i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }

    currentPageHandler(number) {
        const start_offset = (number - 1) * this.props.countriesPerPage;

        this.props.dispatch(setCurrentPage(number));
        this.setState({start_offset});
    }

    render() {
        return (
            <div>
                <div className="search text-center">
                    <input type="text" placeholder="SZUKAJ KRAJU" onChange={(e) => this.search(e)}/>
                </div>
                <div>
                    Pokaż: 
                    <select className="per-page-select" onChange={e => this.chooseCountriesPerPage(e)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    państw na stronie
                </div>
                <Pagination pagesRange={this.createArray(this.props.countriesPerPage)} currentPage={this.props.currentPage} currentPageHandler={(number) => this.currentPageHandler(number)}/>
                <CountryFlagList countries={this.props.visibleCountries.slice(this.state.start_offset, this.state.start_offset + this.props.countriesPerPage)} deleteCountry={(id) => this.deleteCountry(id)}/>
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        countries: store.countriesReducer.countries,
        visibleCountries: store.countriesReducer.visibleCountries,
        countriesPerPage: store.countriesReducer.countriesPerPage,
        currentPage: store.countriesReducer.currentPage
    };
};

export default connect(mapStateToProps)(CountryFlagContainer);