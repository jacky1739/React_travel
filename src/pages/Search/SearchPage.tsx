import React, { useEffect } from 'react'
import styles from './SearchPage.module.css'
import { Header, Footer, ProductList } from '../../components'
import { useLocation, useParams } from 'react-router-dom'
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<keyof MatchParams>()

  const loading = useSelector((state) => state.productSearchSlice.loading)
  const error = useSelector((state) => state.productSearchSlice.error)
  const pagination = useSelector((state) => state.productSearchSlice.pagination)
  const productList = useSelector((state) => state.productSearchSlice.data)

  const dispatch = useAppDispatch()
  const location = useLocation()
  
  useEffect(() => {
    console.log(keywords)
    if (keywords) {
      dispatch(searchProduct({nextPage:1, keywords}))
    }
  }, [location])

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <div>
      <Header />
      {/* 產品列表 */}
      <div className={styles['page-content']}>
       {/* <ProductList /> */}
        <h2>{ keywords }</h2>
        <ProductList 
          data={productList}
          paging={pagination}
          // onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </div>
  )
}