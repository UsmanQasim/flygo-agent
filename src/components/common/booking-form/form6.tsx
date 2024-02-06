"use client";
import { FC, useState } from "react";
import Button from "../btn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/src/services/login.service";

const LoginForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    const res = await login(data);
    if (res?.success) {
      console.log(res, "res");
      window.localStorage.setItem("userData", JSON.stringify(res.data));
      window.localStorage.setItem(
        "accessToken",
        JSON.stringify(res.data?.accessToken)
      );
      router.push("/home/flight/modern");
    }
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        event.preventDefault()
      }
    >
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">user name or Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group form-check">
        <label className="form-check-label" htmlFor="exampleCheck1">
          remember me
        </label>
      </div>
      <div className="button-bottom">
        {/* <Link href="/en/pages/other-pages/register">
          <Button btnClass="w-100 btn btn-solid" name="create account" />
        </Link>
        <div className="divider">
          <h6>or</h6>
        </div> */}
        <Button
          btnClass="w-100 btn btn-solid btn-outline"
          onClick={handleLogin}
          name="login"
        />
      </div>
    </form>
  );
};

export default LoginForm;