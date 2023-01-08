import React from "react";
import "./Login.css";
import { useAccount, useSignMessage } from "wagmi";
import { generateChallenge, authenticate } from "../../lib/apollo/auth/login";
import { setAuthenticationToken } from "../../lib/apollo/auth/state";
const Login = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleLogin = async () => {
    const challenge = await generateChallenge(address);
    if (!challenge) return;
    const signature = await signMessageAsync({
      message: challenge.data.challenge.text,
    });
    const accessTokens = await authenticate(address, signature);
    await setAuthenticationToken({ token: accessTokens.data.authenticate });
    console.log(accessTokens.data.authenticate);
  };

  if (!address) return null;
  return <button onClick={() => handleLogin()}>Login with Lens</button>;
};
export default Login;
