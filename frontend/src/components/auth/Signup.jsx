import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Link } from "react-router-dom"
import LoginImg from '@/assets/login.jfif';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/api/auth/signup', { username, email, password });
      navigate('/login');
      // toast.success('Signup successful!');
      toast({
        title: "Signup Successful!"
      })
    } catch (err) {
      console.error("signup ", err);
      // toast.error('Signup Failed! Try Again.');
      toast({
        variant: "destructive",
        title: "Invalid Form! Could'nt sign up.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      // Handle error
    }
  };



  return (
    <div className='login-container'>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div className="flex items-center justify-center py-12">
          <Card className="mx-auto grid w-[400px] gap-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">SignUp</CardTitle>
              
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mt-8">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="johnwick" value={username}
                    onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Create an account
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Log in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="hidden lg:block lg:relative lg:overflow-hidden lg:rounded-lg">
          <img
            src={LoginImg}
            alt="Login"
            className="object-cover rounded-lg login-img"
          />
        </div>
      </div>
    </div>
  )
};

export default Signup;