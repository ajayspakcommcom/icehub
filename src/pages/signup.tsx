import * as React from 'react';
import dynamic from 'next/dynamic';

const SignupForm = dynamic(() => import('@/components/signup/SignupForm'), { ssr: false });

export default function ComboBox() {
  return (
    <>
      <SignupForm />
    </>
  );
}
