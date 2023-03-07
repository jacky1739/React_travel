import React from 'react'
import { PaymentForm, CheckOutCard } from '../../components'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col } from 'antd'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { placeOrder } from '../../redux/order/slice'

export const PlaceOrderPage = () => {
  const jwt = useSelector(state => state.user.token) as string
  const loading = useSelector(state => state.order.loading)
  const order = useSelector(state => state.order.currentOrder)

  const dispatch = useAppDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({ jwt, orderId: order.id} ))
            }}
          />
        </Col> 
      </Row>
    </MainLayout>
  )
}