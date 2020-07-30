import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item>
      </Menu.Item>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      {/* <a href="/favorite">Favorite</a> */}
    </Menu.Item>
     </Menu>
  )
}

export default LeftMenu