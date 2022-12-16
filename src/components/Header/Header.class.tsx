import React from 'react'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import styles from './Header.module.css'
import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
import store from '../../redux/store'
import { languageState } from '../../redux/languageReducer'
import { withTranslation, WithTranslation } from 'react-i18next'

// 將languageState使用State來繼承
interface State extends languageState {}

class HeaderComponent extends React.Component<RouteComponentProps & WithTranslation, State>{

  // 可以在constructor裡面取得store的資料
  constructor(props) {
    super(props)
    // 將store的資料取出
    const storeState = store.getState()
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList
    }
    // 使用訂閱store的方式 要是store的資料有變動的話 此時store就會透過回調函數的方式 把資料推送到元件之中
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    const storeState = store.getState()
    // setState 為 state 的更新函數 把store的資料綁定到畫面上
    this.setState({
      language: storeState.language,
      languageList: storeState.languageList
    })
  }

  menuClickHandler = (e) => {
    console.log(e)
    if (e.key === "new") {
      // 處理新語言action
      const action = {
        type: "add_language",
        payload: { code: "new_lang", name: "新語言" }
      }
      store.dispatch(action)
    } else {
      const action = {
        type: "change_language",
        payload: e.key
      }
      store.dispatch(action)
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
                    ...this.state.languageList.map(item => {
                      return { key: item.code, label: item.name}
                    }),
                    { key: "new", label: t("header.add_new_language") }
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
              { this.state.language === "zh" ? "中文" : "English" }
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

export const Header = withTranslation()(withRouter(HeaderComponent))
