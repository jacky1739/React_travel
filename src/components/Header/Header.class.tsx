import React from 'react'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import styles from './Header.module.css'
import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
import { RootState } from '../../redux/store'
import { withTranslation, WithTranslation } from 'react-i18next'
import { changeLanguageActionCreator, addLanguageActionCreator } from '../../redux/language/languageActions'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // return 裡面就是每一個 dispatch 的處理函數
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code)
      dispatch(action)
    },
    addLanguage: (name: string, code: string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action)
    }
  }
}

type PropsType = RouteComponentProps & // react-router 路由 props 類型
  WithTranslation & // i18n props 類型
  ReturnType<typeof mapStateToProps> & // redux store 類型
  ReturnType<typeof mapDispatchToProps> // redux dispatch 映射類型

class HeaderComponent extends React.Component<PropsType>{

  menuClickHandler = (e) => {
    console.log(e)
    if (e.key === "new") {
      this.props.addLanguage('新語言', 'new_lang')
    } else {
      this.props.changeLanguage(e.key)
    }
  }

  render () {
    const { navigate, t } = this.props

    // const language = [
    //   { key: '1', label: '中文'},
    //   { key: '2', label: 'English'}
    // ]

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
                <Menu onClick={this.menuClickHandler}
                  items={[
                    ...this.props.languageList.map(item => {
                      return { key: item.code, label: item.name}
                    }),
                    { key: "new", label: t("header.add_new_language") }
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
              { this.props.language === "zh" ? "中文" : "English" }
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
        />
      </div>
    )
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(withRouter(HeaderComponent))
)
