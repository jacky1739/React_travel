import React from 'react'
import { UserLayout } from '../../layout/userLayout'
import { SignInForm } from './SignInForm'

export const SignInPage: React.FC = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  )
}