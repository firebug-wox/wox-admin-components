import React, { Component } from 'react';
import { render } from 'react-dom';
import WoxTitle from './src/index';

render(
  <WoxTitle title={ '产品列表' }>
    <a href="copyProduct.html" target='_blank'>+</a>
  </WoxTitle>,
  document.getElementById('app')
);
