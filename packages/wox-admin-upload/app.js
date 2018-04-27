import React, { Component } from 'react';
import { render } from 'react-dom';
import WoxUpload from './src/index';

render(
  <WoxUpload action="/upload.do" />,
  document.getElementById('app')
);
