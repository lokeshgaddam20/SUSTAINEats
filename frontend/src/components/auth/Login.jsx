import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import '@/styles/login.css';

// import Image from "react-image"
import LoginImg from '@/assets/login.jfif';
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', { email, password });
      const { token, user } = response.data;
      login(token, user.id ,true);
      navigate('/');
      // toast.success('Login successful!');
      toast({
        title: "Login Successful"
      })
    } catch (err) {
      console.error("Login ", err);
      toast({
        variant: "destructive",
        title: "Invalid Credentials",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      // Handle error
    }
  };

  return (
    <div className='login-container'>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
        <div className="flex items-center justify-center py-12 rounded-lg bg-card text-card-foreground shadow-sm">
          <div className="mx-auto grid w-full max-w-[400px] gap-6 p-6 rounded-lg border bg-background">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              {/* <p className="text-balance text-muted-foreground">
              Login to your account
            </p> */}
            </div>
            <div className="grid gap-4 mt-12">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <Button type="submit" className="w-full" onClick={handleSubmit}>
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:relative lg:overflow-hidden lg:rounded-lg items-center">
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

export default Login;