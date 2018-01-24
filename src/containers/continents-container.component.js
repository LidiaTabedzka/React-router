import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setContinent, deleteCountry } from '../actions/actions-countries';
import CountryFlagList from '../presentational/flag-list.component';

class ContinentsContainer extends Component {

    chooseContinent(event) {
        this.props.dispatch(setContinent(event.target.value))
    }

    deleteCountry(id) {
        this.props.dispatch(deleteCountry(id));
    }

    componentDidMount() {
        this.props.dispatch(setContinent('Europa'));
    }

    render() {
        return (
            <div>
                <div className="select-continent">
                    <select onChange={e => this.chooseContinent(e)}>
                        <option value="Europa">Europa</option>
                        <option value="Afryka">Afryka</option>
                    </select>
                </div>
                <CountryFlagList countries={this.props.visibleCountries} deleteCountry={(id) => this.deleteCountry(id)} />
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        visibleCountries: store.countriesReducer.visibleCountries
    };
};

export default connect(mapStateToProps)(ContinentsContainer);