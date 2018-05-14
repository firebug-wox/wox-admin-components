import React from 'react';
import { render } from 'react-dom';
import WoxTable from './src/index';

const data = [
  {
    tripsPeopleNum: '1',
    bookingChannel: '2',
    createTime: '3',
    follower: '4',
  },{
    tripsPeopleNum: '5',
    bookingChannel: '6',
    createTime: '7',
    follower: '8',
  },{
    tripsPeopleNum: '4',
    bookingChannel: '3',
    createTime: '2',
    follower: '1',
  },{
    tripsPeopleNum: '8',
    bookingChannel: '7',
    createTime: '6',
    follower: '5',
  }
]
const columns = [
  {
    title: '数量',
    dataIndex: 'tripsPeopleNum',
    key: 'tripsPeopleNum',
    width:'25%'
  }, {
    title: '渠道销售',
    dataIndex: 'bookingChannel',
    key: 'bookingChannel',
    width:'25%'
  }, {
    title: '下单时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width:'25%'
  }, {
    title: '跟单人',
    dataIndex: 'follower',
    key: 'follower',
    width:'25%'
  }
];

render(
  <WoxTable
    columns={columns}
    dataSource={data}
    bordered={true}
    rowColorDifferent={true}
  />,
  document.getElementById('app')
);
