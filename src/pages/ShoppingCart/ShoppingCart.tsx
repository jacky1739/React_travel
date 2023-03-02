import React from 'react'
import styles from './ShoppingCart.module.css'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col, Affix } from 'antd'
// Affix 錨點元件
import { ProductList, PaymentCard } from '../../components'

interface PropsType {
  children: React.ReactNode
}

export const ShoppingCartPage: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* 購物清單 */}
        <Col span={18}>
          <div className={styles['product-list-container']}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* 支付卡元件 */}
        <Col span={6}>
          <Affix>
            <div className={styles['paymant-card-container']}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}