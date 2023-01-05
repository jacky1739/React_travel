import React from 'react'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import styles from './Header.module.css'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'

// import { Dispatch } from 'redux'
// import { LanguageActionTypes } from '../../redux/language/languageActions'
import { changeLanguageActionCreator, addLanguageActionCreator } from '../../redux/language/languageActions'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const navigate = useNavigate() // 進行頁面的處理
  const locatioin = useLocation() // 當前的頁面訊息 用來保存路由的狀態
  const params = useParams()
  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const menuClickHandler = (e) => {
    console.log(e.key)
    if (e.key === "new") {
      dispatch(addLanguageActionCreator("新語言", "new_lang"))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  const menu = [
    { key: "1", label: t("header.home_page") },
    { key: "2", label: t("header.weekend") },
    { key: "3", label: t("header.group") },
    { key: "4", label: t("header.backpack") },
    { key: "5", label: t("header.private") },
    { key: "6", label: t("header.cruise") },
    { key: "7", label: t("header.hotel") },
    { key: "8", label: t("header.local") },
    { key: "9", label: t("header.theme") },
    { key: "10", label: t("header.custom") },
    { key: "11", label: t("header.study") },
    { key: "12", label: t("header.visa") },
    { key: "13", label: t("header.enterprise") },
    { key: "14", label: t("header.high_end") },
    { key: "15", label: t("header.outdoor") },
    { key: "16", label: t("header.insurance") }
  ]

  return(
    <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            {/* <Typography.Text>讓旅遊更幸福</Typography.Text> */}
            <Typography.Text className={styles['header-title-slogan']}>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15, width: '90%' }}
              overlay={
                <Menu onClick={menuClickHandler}>
                  {languageList.map(language => {
                    return <Menu.Item key={language.code}>{language.name}</Menu.Item>
                  })}
                  <Menu.Item key={"new"}>
                    {t("header.add_new_language")}
                  </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
          </div>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/register')}>{t("header.register")}</Button>
            <Button onClick={() => navigate('/signin')}>{t("header.signin")}</Button>
          </Button.Group>
        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          <Input.Search className={styles['search-input']} placeholder={'清輸入旅遊目的, 主題, 或關鍵字'}></Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}
          items={menu}
        >
        </Menu>
      </div>
  )
}