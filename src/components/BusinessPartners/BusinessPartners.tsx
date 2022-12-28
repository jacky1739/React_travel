import React from 'react'
import styles from './BusinessPartners.module.css'
import { Typography, Divider, Row, Col } from 'antd'
import image1 from '../../assets/images/facebook-807588_640.png'
import image2 from '../../assets/images/icon-720944_640.png'
import image3 from '../../assets/images/follow-826033_640.png'
import image4 from '../../assets/images/microsoft-80658_640.png'

interface PropsType {
  title: JSX.Element
}

export const BusinessPartners: React.FC<PropsType> = ({title}) => {
  // const { t } = useTranslation()

  const companies = [
    { image: image1, title: 'Facebook'},
    { image: image2, title: 'Youtube'},
    { image: image3, title: 'Ins'},
    { image: image4, title: 'Microsoft'}
  ]

  return (
    <div className={styles.content}>
      <Divider orientation="left">
        {/* <Typography.Title level={3}>合作夥伴</Typography.Title> */}
        {title}
      </Divider>
      <Row>
        {
          companies.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <img
                  src={item.image} alt={item.title}
                  style={{
                    width: '80%',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}