import React from 'react'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import styles from './Header.module.css'
import { withRouter, RouteComponentProps } from '../../helpers/withRouter'
import store from '../../redux/store'
import { languageState } from '../../redux/languageReducer'
// 將languageState使用State來繼承
interface State extends languageState {}

class HeaderComponent extends React.Component<RouteComponentProps, State>{

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
        payload: { code: "new_lang", name: "新語言"}
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
    const { navigate } = this.props

    // const language = [
    //   { key: '1', label: '中文'},
    //   { key: '2', label: 'English'}
    // ]

    const menu = [
      { key: "1", label: "旅游首页" },
      { key: "2", label: "周末游" },
      { key: "3", label: "跟团游" },
      { key: "4", label: "自由行" },
      { key: "5", label: "私家团" },
      { key: "6", label: "邮轮" },
      { key: "7", label: "酒店+景点" },
      { key: "8", label: "当地玩乐" },
      { key: "9", label: "主题游" },
      { key: "10", label: "定制游" },
      { key: "11", label: "游学" },
      { key: "12", label: "签证" },
      { key: "13", label: "企业游" },
      { key: "14", label: "高端游" },
      { key: "15", label: "爱玩户外" },
      { key: "16", label: "保险" }
    ]

    return(
      <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            {/* <Typography.Text>讓旅遊更幸福</Typography.Text> */}
            <Typography.Text className={styles['header-title-slogan']}>讓旅遊更幸福</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15, width: '90%' }}
              overlay={
                <Menu onClick={this.menuClickHandler}
                  items={[
                    ...this.state.languageList.map(item => {
                      return { key: item.code, label: item.name}
                    }),
                    { key: "new", label: "添加新語言" }
                  ]}
                />
              }
              icon={<GlobalOutlined />}
            >
              { this.state.language === "zh" ? "中文" : "English" }
            </Dropdown.Button>
          </div>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/register')}>註冊</Button>
            <Button onClick={() => navigate('/signin')}>登入</Button>
          </Button.Group>
        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>React 旅遊網</Typography.Title>
          <Input.Search className={styles['search-input']} placeholder={'清輸入旅遊目的, 主題, 或關鍵字'}></Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}
          items={menu}
        />
      </div>
    )
  }
}

export const Header = withRouter(HeaderComponent)
