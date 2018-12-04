import React, { Component } from 'react';
import { LocaleProvider, DatePicker, message } from 'antd';
import { HomeTemplate } from '../templates/HomeTemplate';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import api from '../../api';

class DataFetcher extends Component {
  state = {
    isLoading: true,
    isError: false,
    data: null,
  };

  componentDidMount() {
    const { fetchUrl, fetchData } = this.props;
    (fetchData || api.get(fetchUrl)).then(({ data }) => {
      this.setState(() => ({
        isLoading: false,
        isError: false,
        data,
      })).catch(err => {
        this.setState(() => ({
          isLoading: false,
          isError: true,
        }));
      });
    });
  }

  render() {
    const { renderData } = this.props;
    const { isLoading, isError, data } = this.state;
    return renderData({ isLoading, isError, data });
  }

  render2() {
    const { renderData } = this.props;
    const { isLoading, data, isError } = this.state;

    if (isError && !dontShowError) {
      return <ErroMessage />;
    }

    return (
      <div>
        {isLoading && <Loading />}
        {renderData({ isLoading, data, isError })}
      </div>
    );
  }
}

export class HomePage extends Component {
  render() {
    return (
      <DataFetcher
        fetchUrl="...home"
        renderItems={({ isLoading, data, isError }) => (
          <HomeTemplate
            isLoading={isLoading}
            isError={isError}
            users={data}
            //error={error}
          />
        )}
      />
    );
  }
}
