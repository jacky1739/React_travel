import React, { useState, useEffect } from 'react'
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import styles from './HomePage.module.css'

// import { productList1, productList2, productList3 } from './mockups'

import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'

import { useTranslation } from 'react-i18next'

import axios from 'axios'

export const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const [ productList, setProductList ] = useState<any>([])
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ error, setError ] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections")
        console.log(data)
        setLoading(false)
        setError(null)
        setProductList(data)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [])

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

  if (error) {
    return <div>網站出錯: {error}</div>
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
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
          sideImage={sideImage3}
          products={productList[0].touristRoutes}
        />
        <BusinessPartners
          title={<Typography.Title level={3} type="success">{t('footer.collaboration')}</Typography.Title>}
        />
      </div>
      <Footer />
    </div>
  )
}