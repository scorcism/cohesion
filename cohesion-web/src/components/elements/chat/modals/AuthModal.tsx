import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/context/AppContext";
import { useConversation } from "@/context/context/ConversationContext";
import { apiService } from "@/services/api.service";
import { LoginType, RegisterType } from "@/types/common";
import { config } from "@/utils/config";
import Cookies from 'js-cookie';
import React, { ChangeEvent, useState } from 'react';
import { toast } from "sonner";

const AuthModal = () => {

  const { showLoginModal, setShowLoginModal, setUser } = useApp()
  const {setMessages} = useConversation()

  const [isLoading, setIsLoading] = useState(false);
  const [userCredLogin, setUserCredLogin] = useState<LoginType>({
    email: "",
    password: ""
  })
  const [userCredRegister, setUserCredRegister] = useState<RegisterType>({
    name: "",
    email: "",
    password: ""
  })
  const [activeTab, setActiveTab] = useState("login")

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredLogin({ ...userCredLogin, [e.target.name]: e.target.value })
  }

  const handleOnChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    setUserCredRegister({ ...userCredRegister, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.login(userCredLogin.email, userCredLogin.password)
      if (response.status) {
        const _data = response.data.data
        Cookies.set(config.AUTH_TOKEN, _data.token)
        Cookies.set(config.AUTH_EMAIL, _data.email)
        setUser({
          token: _data.token,
          email: _data.email
        })
        setMessages([])
        setShowLoginModal(false)
        toast.success("Login successfull🍰")
      } else {
        toast.error(response.message.message)
      }
    } catch (error) {
      toast.error("Error while registering user, check console for full context")
      console.log({ error })
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiService.register(userCredRegister.name, userCredRegister.email, userCredRegister.password)
      if (response.status) {
        toast.success("Registration complete, please login");
        setTimeout(() => {
          setActiveTab("login")
        }, 1000);
      } else {
        toast.error(response.message.message)
      }
    } catch (error) {
      toast.error("Error while registering user, check console for full context")
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cohesion</DialogTitle>
          <DialogDescription>
            Sign in or create an account to continue
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={activeTab} className="w-full" value={activeTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => setActiveTab("login")}>Login</TabsTrigger>
            <TabsTrigger value="register" onClick={() => setActiveTab("register")}>Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleOnChange}
                  id="email"
                  name="email"
                  value={userCredLogin.email}
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={handleOnChange}
                  id="password"
                  name="password"
                  value={userCredLogin.password}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Name:</Label>
                <Input
                  onChange={handleOnChangeRegister}
                  name="name"
                  value={userCredRegister.name}
                  id="register-name"
                  type="text"
                  placeholder="Joe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  onChange={handleOnChangeRegister}
                  name="email"
                  value={userCredRegister.email}
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  onChange={handleOnChangeRegister}
                  name="password"
                  value={userCredRegister.password}
                  id="register-password"
                  type="password"
                  placeholder="Strong password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading} onClick={handleSubmitRegister}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;