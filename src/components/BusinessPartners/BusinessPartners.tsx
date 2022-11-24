import React from 'react'
import styles from './BusinessPartners.module.css'
import { Typography, Divider, Row, Col } from 'antd'

export const BusinessPartners: React.FC = () => {
//   const busines = {}

  return (
    <div className={styles.content}>
      <Divider orientation="left">
        <Typography>合作夥伴</Typography>
        </Divider>
    </div>
  )
}