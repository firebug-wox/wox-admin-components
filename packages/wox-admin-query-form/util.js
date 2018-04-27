export const utils = {
  // 模糊搜索 格式化 poi 数据
  formatPoiDataFn: function(val) {
    return val.map(v=>({
      key: v.self.code,
      label: `【${v.self.type}】${v.self.code} | ${v.self.cnName}  ${v.pre ?  ' > ' +v.pre.cnName : ''}  ${v.top ? ' > '+ v.top.cnName : ''}`
    }))
  },
  // 模糊搜索 格式化 poi label展示数据
  formatPoiLabelFn: function(val) {
    let reg = /【.+】/;
    return val.map(item => {
      let sec = item.label.split('>')[0];
      let data = sec.replace(reg,'');
      item.label = data;
      return item;
    });
  },
  // 模糊搜索 格式化 入住酒店 数据
  formatHotelDataFn: function(val, keyword) {
    let hotelsArr = val.map(v => ({ key: v.id, label: `${v.id} - ${v.nameCN}`}));
    return [
      ...hotelsArr, 
      {key: keyword, label: keyword},
      {key: '或同级', label: '或同级'}
    ];
  },
  // 模糊搜索 格式化 供应商 数据
  formatSupplierDataFn: function(val) {
    return val.map(v => ({ key: v.id, label: `${v.id} - ${v.nameCN}`}));
  },
  // 模糊搜索 格式化 tags 数据
  formatTagsDataFn: function(val, keyword) {
    let data = val.map( v => ({ key: v, label: v, }));
    data.push({ key: keyword, label: keyword });
    return data;
  },
  // 模糊搜索 格式化 tagFuzzy 数据
  formatTagFuzzyDataFn: function(val,keyword) {
    return ( val || [] ).map( v => ({
      key: v.code,
      label: `${v.code} | ${v.path}  ${v.nameEN}`,
    }));
  }
}