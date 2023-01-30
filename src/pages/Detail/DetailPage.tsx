import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Spin, Row, Col, DatePicker, Divider, Typography } from 'antd'
import styles from './Detail.module.css'
import { Header, Footer, ProductIntro, ProductComments } from '../../components'
import { commentMockData } from './mockup'

// 大部分情況type和interface是可以交換使用的 但少數不行
// 例如對某個類型進行重命名定義的時候
// type MatchParams = {
//   touristRouteId: string
//   other: string
// }

interface MatchParams2 {
  touristRouteId: string
} 

export const DetailPage: React.FC = () => {
  // let params = useParams<'touristRouteId'>()
  // 因為useParams只能傳入string
  // 如果要使用interface就需要加 keyof
  let { touristRouteId } = useParams<keyof MatchParams2>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const { RangePicker } = DatePicker

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "error")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "200",
          marginBottom: "200",
          width: "100%"
        }}
      />
    )
  }

  if (error) {
    return <div>網站出錯： {error}</div>
  }

  return (
    <div>
      <Header />
      <div className={styles["page-content"]}>
        {/* 產品簡介 和 日期選擇 */}
        <div className={styles["product-intro-container"]}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.descriptioin}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((picture) => 
                  picture.url
                )}
              />
            </Col>
            <Col span={11}>
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 錨點菜單 */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* 產品特色 */}
        <div id='feature' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>產品特色</Typography.Title>
          </Divider>
          {/* react為防止注入攻擊, 有特殊的html處理機制, 使用dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{__html: product.features}} style={{ margin: 50 }}></div>
        </div>
        {/* 費用 */}
        <div id='fees' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>費用</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html: product.fees}} style={{ margin: 50 }}></div>
        </div>
        {/* 預定須知 */}
        <div id='notes' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>預定須知</Typography.Title>
          </Divider>
          <div dangerouslySetInnerHTML={{__html: product.notes}} style={{ padding: 20 }}></div>
        </div>
        {/* 商品評價 */}
        <div id='comments' className={styles['product-detail-container']}>
          <Divider orientation={'center'}>
            <Typography.Title level={3}>用戶評論</Typography.Title>
            <div style={{ margin: 40 }}>
              <ProductComments data={commentMockData} />
            </div>
          </Divider>
        </div>
      </div>
      <Footer />
    </div>
  )

}
