import { Repeat, Send } from "@styled-icons/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/interface/Button";
import { Input } from "../components/interface/Input";
import { Modal } from "../components/interface/Modal";
import { useUser } from "../contexts/UserContext";

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const title = "sign in";

  const handleLogin = async (e) => {
    const user = {
      username,
      password,
    };
    const res = await signIn(user);
    alert(res?.message);
    if (res?.token) {
      navigate("/dash");
    }
  };

  return (
    <Modal title={title}>
      <Input
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex">
        <Button onClick={() => navigate("/signup")}>
          <Repeat size={20} />
          or sign up
        </Button>
        <div className="w-full" />
        <Button onClick={() => handleLogin()}>
          submit <Send size={20} />
        </Button>
      </div>
    </Modal>
  );
};
