//begin---处理给非react使用者使用处理
import nanPlayer from '../../src';
import '../../src/style';
window.nanPlayer = nanPlayer;
//end----处理给非react使用者使用处理

//下面的代码只针对React做例子
import React from 'react';
import { render } from 'react-dom';
import Container from './container';

function randomKey() {
  return Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.');
}

function renderApp(hot) {
  const dom = document.getElementById('app');
  if (dom) {
    render(<Container hot={hot} />, dom);
  }
}
renderApp();
if (module.hot) {
  module.hot.accept('./container', () => {
    var hot = randomKey();
    return renderApp(hot);
  });
}
