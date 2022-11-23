import React from 'react'
import styles from './SideMenu.module.css'
import { sideMenuList } from './mockup'
import { Menu } from 'antd'
import { GifOutlined } from '@ant-design/icons'

export const SideMenu: React.FC = () => {

  return (
    <Menu
      mode='vertical'
      className={styles['side-menu']}
      items={sideMenuList.map((m) => {
        return {
          label: m.title,
          key: m.title,
          icon: <GifOutlined />,
          children: m.subMenu.map((sm) => {
            return {
              label: sm.title,
              key: sm.title,
              icon: <GifOutlined />,
              children: sm.subMenu.map((sms) => {
                return {
                  label: sms,
                  key: sms,
                  icon: <GifOutlined />
                }
              })
            }
          })
        }
      })}
    ></Menu>
  )
}