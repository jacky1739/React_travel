import React from 'react'
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import styles from './HomePage.module.css'

// import { productList1, productList2, productList3 } from './mockups'

import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
// 小寫的為HOC 大寫為typescript定義
import { withTranslation, WithTranslation } from 'react-i18next'

import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { initRecommendProductDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions'

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    giveData: () => {
      dispatch(initRecommendProductDataActionCreator())
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
  componentDidMount() {
    this.props.giveData()
  }

  render () {
    // console.log(this.props.t)
    const { t, productList, loading, error } = this.props

    if (loading) {
      return (
        <Spin
          size="large"
          style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%"
          }}
        />
      )
    }

    if(error) {
      return (
        <div>網站出錯: {error}</div>
      )
    }

    return (
      <div>
        <Header />
        {/* 頁面內容 */}
        <div className={styles['page-content']}>
            <Row style={{marginTop: 20}}>
                <Col span={6}>
                    <SideMenu />
                </Col>
                <Col span={18}>
                    <Carousel />
                </Col>
            </Row>
            <ProductCollection
                title={<Typography.Title level={3} type="warning">{t('home_page.hot_recommended')}</Typography.Title>}
                sideImage={sideImage}
                products={productList[0].touristRoutes}
            />
            <ProductCollection
                title={<Typography.Title level={3} type="danger">{t('home_page.new_arrival')}</Typography.Title>}
                sideImage={sideImage2}
                products={productList[1].touristRoutes}
            />
            <ProductCollection
                title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
                sideImage={sideImage3}
                products={productList[2].touristRoutes}
            />
            <BusinessPartners
              title={<Typography.Title level={3} type="success">{t('footer.collaboration')}</Typography.Title>}
            />
        </div>
        <Footer />
      </div>
    )
  }
}

// 第一個小誇號 代表語言所使用的命名空間 第二個才是元件
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))