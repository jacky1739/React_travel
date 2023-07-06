import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import styles from './Detail.module.css'
import { ProductIntro, ProductComments } from '../../components'
import { commentMockData } from './mockup'
import { getProductDetail } from '../../redux/productDetail/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'
// import { useDispatch } from 'react-redux'
import { MainLayout } from '../../layout/mainLayout'
import { addShoppingCartItem } from '../../redux/shoppingCart/slice'


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

  // const [loading, setLoading] = useState<boolean>(true)
  // const [product, setProduct] = useState<any>(null)
  // const [error, setError] = useState<string | null>(null)

  const loading = useSelector((state) => state.productDetail.loading)
  const error = useSelector((state) => state.productDetail.error)
  const product = useSelector((state) => state.productDetail.data)

  const jwt = useSelector(state => state.user.token) as string
  const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)

  const dispatch = useAppDispatch()

  const { RangePicker } = DatePicker

  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId))
    }
  }, [])

  // console.log(jwt ,product.id)

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
    <MainLayout>
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
            <Button
              style={{marginTop: 50, marginBottom: 30, display: "block"}}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(addShoppingCartItem({ jwt ,touristRouteId: product.id }))
              }}
            >
              <ShoppingCartOutlined />
              加入購物車
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 錨點菜單 */}
      <Anchor className={styles["product-detail-anchor"]}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="產品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Anchor.Link href="#fees" title="費用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#notes" title="預定須知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#comments" title="用戶評價"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>
      {/* 產品特色 */}
      <div id="feature" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>產品特色</Typography.Title>
        </Divider>
        {/* react為防止注入攻擊, 有特殊的html處理機制, 使用dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{__html: product.features}} style={{ margin: 50 }}></div>
      </div>
      {/* 費用 */}
      <div id="fees" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>費用</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{__html: product.fees}} style={{ margin: 50 }}></div>
      </div>
      {/* 預定須知 */}
      <div id="notes" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>預定須知</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{__html: product.notes}} style={{ padding: 20 }}></div>
      </div>
      {/* 商品評價 */}
      <div id="comments" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>用戶評論</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  )
}
