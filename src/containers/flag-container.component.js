import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryFlagList from '../presentational/flag-list.component';
import { getCountries, searchCountries, deleteCountry } from '../actions/actions-countries';

class CountryFlagContainer extends Component {

    componentDidMount() {
        this.props.dispatch(searchCountries(''));
        this.props.dispatch(getCountries());
    }

    search(event) {
        this.props.dispatch(searchCountries(event.target.value));
    }

    deleteCountry(id) {
        this.props.dispatch(deleteCountry(id));
    }

    render() {
        return (
            <div>
                <div className="search text-center">
                    <input type="text" placeholder="SZUKAJ KRAJU" onChange={(e) => this.search(e)}/>
                </div>
                <CountryFlagList countries={this.props.visibleCountries} deleteCountry={(id) => this.deleteCountry(id)}/>
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        countries: store.countriesReducer.countries,
        visibleCountries: store.countriesReducer.visibleCountries
    };
};

export default connect(mapStateToProps)(CountryFlagContainer);