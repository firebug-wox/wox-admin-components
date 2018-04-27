import React, { Component } from 'react';

const assign = Object.assign;

const WoxQueryForm = (InfosForm) => {
  class HOCInfosForm extends Component {
    setUrlParams(values) {    // 获取表单数据，转化成 url 参数
      const keys = Object.keys(values);
      const queryStr = [];

      keys.map(key => {
        if (!!values[key]) {
          if (typeof values[key] === 'object') {
            if (!(Array.isArray(values[key]) && !values[key].length)) {   // 空数组不做  URL 拼接处理
              queryStr.push(`${key}=${encodeURIComponent(JSON.stringify(values[key]))}`);
            }
          } else {
            queryStr.push(`${key}=${encodeURIComponent(values[key])}`);
          }
        } 
      });

      history.pushState({}, document.title, location.href.split('?')[0] + '?' + queryStr.join('&'))
    }

    getUrlParams() {          // 获取 url 参数，转换成表单数据
      const reg = /^(?:[^?]*\?)?([\w\d\-=&%]+)/;
      const matchArr = window.location.href.match(reg);
      const queryStr = matchArr[1];

      return queryStr.split('&').reduce((query, pair) => {
        let key = '';
        let value = '';

        if (pair.indexOf('=') === -1) {
          key = decodeURIComponent(pair);
          value = void 0;
        }
        pair = decodeURIComponent(pair).split('=');
        key = pair[0];
        value = pair[1];
        query[key] = value;

        return query;
      }, {});
    }

    render () {
      const { ...others } = this.props;
      const urlParams = this.getUrlParams();

      return (
        <InfosForm
          {...assign({}, others, urlParams)}
          handleHocSubmit={this.setUrlParams}
        />
      );
    }
  }
  return HOCInfosForm
}

export default WoxQueryForm;
