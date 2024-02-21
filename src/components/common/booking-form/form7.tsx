"use client";
import { EmailAddress, FullName, Password } from "@/constant/constant";
import Button from "../btn";
import Link from "next/link";
import { useState } from 'react';
import { FormData, registerAgent } from "@/services/login";

const RegisterForm = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [landline, setLandline] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [agentId, setAgentId] = useState('');
  const [username, setUsername] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [akamaNumber, setAkamaNumber] = useState('');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [documents, setDocuments] = useState<File | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = {
      fullName,
      email,
      password,
      landline,
      mobile,
      country,
      city,
      agentId,
      username,
      companyName,
      representativeName,
      akamaNumber,
      companyLogo,
      documents
    };
    
    try {
      const response = await registerAgent(formData);
      console.log('Registration successful:', response.data);
      // You can handle successful registration here
    } catch (error) {
      console.error('Error registering:', error);
      // You can handle registration error here
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">{FullName}</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

      <div className="form-group">
        <label htmlFor="landline">Landline Number</label>
        <input
          type="number"
          className="form-control"
          id="landline"
          placeholder="Enter your number"
          value={landline}
          onChange={(e) => setLandline(e.target.value)}
        />
      </div>

       <div className="form-group">
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="number"
          className="form-control"
          id="mobile"
          placeholder="Enter your mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

     <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          id="country"
          placeholder="Enter your country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

       <div className="form-group">
        <label htmlFor="agentId">Travel Agent ID</label>
        <input
          type="text"
          className="form-control"
          id="agentId"
          placeholder="Enter your Travel Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
        />
      </div>

         <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          className="form-control"
          id="company"
          placeholder="Enter your Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="representative">Company Representative Name</label>
        <input
          type="text"
          className="form-control"
          id="representative"
          placeholder="Enter your Company Representative Name"
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
        />
      </div>

        <div className="form-group">
        <label htmlFor="akama">Akama/Identification Number</label>
        <input
          type="text"
          className="form-control"
          id="akama"
          placeholder="Enter your Akama/Identification Number"
          value={akamaNumber}
          onChange={(e) => setAkamaNumber(e.target.value)}
        />
      </div>

     <div className="form-group">
        <label htmlFor="formFile" className="form-label">
          Company Logo
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          accept="image/*"
          onChange={(e) => setCompanyLogo(e.target.files?.[0] || null)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="formFile2" className="form-label">
          Documents
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile2"
          onChange={(e) => setDocuments(e.target.files?.[0] || null)}
        />
      </div>

      <div className="button-bottom">
        {/* <Link href="/en/pages/other-pages/register">
          <Button btnClass="w-100 btn btn-solid" name="create account"  />
        </Link> */}
         <button type="submit" className="w-100 btn btn-solid">
        Create Agent Account
      </button>
        <div className="divider">
          <h6>or</h6>
        </div>
        <Link href="/pages/other-pages/login">
          <Button btnClass="w-100 btn btn-solid btn-outline" name="login" />
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
