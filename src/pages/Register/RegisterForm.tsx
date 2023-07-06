import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styles from './RegisterForm.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      await axios.post("http://123.56.149.216:8080/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      })
      navigate('/signin')
    } catch (error) {
      alert("注册失败！")
    }
  }
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={styles['register-form']}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        { required: true, message: 'Please input your password!' }
    ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirm"
      hasFeedback
      rules={[
        { required: true, message: 'Please input your confrim password!' },
        // 需要使用函數來驗證 用大括號展開取得getFieldValue這個函數
        (({getFieldValue}) => ({
            // 調用表單自帶的validator這個函數
            // 第一個參數是rule object使用下底線表示 第二個是傳遞進來的數據
            validator(_, value) {
              // 調用name裡的password
              if (!value || getFieldValue("password") === value) {
                // Promise.resolve是驗證成功
                return Promise.resolve()
              }
              // 錯誤訊息可以用字串的方式傳入到reject函數中
              return Promise.reject("密碼確認不一致！")
            }
        }))
    ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}