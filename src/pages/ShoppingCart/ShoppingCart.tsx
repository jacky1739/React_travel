import React from 'react'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col, Affix } from 'antd'
// Affix 錨點元件
import { ProductList, PaymentCard } from '../../components'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { clearShoppingCartItem } from '../../redux/shoppingCart/slice'

interface PropsType {
  children: React.ReactNode
}

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector(state => state.shoppingCart.loading)
  const shoppingCartItems = useSelector(state => state.shoppingCart.items)
  const jwt = useSelector(state => state.user.token) as string
  const dispatch = useAppDispatch()

  return (
    <MainLayout>
      <Row>
        {/* 購物清單 */}
        <Col span={18}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map(item => item.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡元件 */}
        <Col span={6}>
          <Affix>
            <div className={styles['paymant-card-container']}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems.map(item => item.originalPrice).reduce((a, b) => a + b, 0)}
                price={shoppingCartItems.map(item => item.originalPrice * (item.discountPresent ? item.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                onCheckout={() => {}}
                onShoppingCartClear={() => {
                  dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(item => item.id)}))
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}