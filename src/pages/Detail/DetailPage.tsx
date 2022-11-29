import React from 'react'
import { useParams } from 'react-router-dom'

// 大部分情況type和interface是可以交換使用的 但少數不行
// 例如對某個類型進行重命名定義的時候
// type MatchParams = {
//   touristRouteId: string
//   other: string
// }

interface MatchParams2 {
  touristRouteId: string
  other: string
}

export const DetailPage: React.FC = () => {
  // let params = useParams<'touristRouteId'>()
  let params = useParams<keyof MatchParams2>()

  return (
    <h1>旅遊詳情頁面, 路線id: {params.touristRouteId} {params.other}</h1>
  )
}