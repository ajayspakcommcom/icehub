"use client";

import React from "react";
import Link from "next/link";
import Toast from "@/components/Toast";
import { Box, Button, Grid, TextField, Typography, Card, CardContent } from "@mui/material";
import LoginForm from '../components/login/login';
import Image from 'next/image';


export default function SignInOne() {



  return (
    <>
      <div className="login-wrapper">
        <div>
          {/* <Image
            src={require('../../../public/images/banner/1.png')}
            alt="Description of the image"
            width={500}
            height={300}
          /> */}
        </div>
        <div>
          <Typography variant="h2" align="left" gutterBottom>Login</Typography>
          <p> Don't have an account? <Link href="/signup" title=""> Sign Up </Link> </p>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
