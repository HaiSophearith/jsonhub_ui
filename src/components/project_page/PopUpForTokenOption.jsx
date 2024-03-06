import React from "react";
import { useState } from "react";
import { generateTokenApi } from "../../redux/service/AuthService";
import { useRef } from "react";

import copyIcon from "../../asset/icon/copyIconDoc.svg";
import copiedIcon from "../../asset/icon/copiedIcon.svg";
import CopyToClipboard from "react-copy-to-clipboard";

export default function PopUpForTokenOption() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [copyTextApiToken, setCopyTextApiToken] = useState("");

  const textRefGetToken = useRef(null);

  const [isCopiedToken, setIsCopiedToken] = useState(false);

  function handleEmailChange(event) {
    setEmailValue(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordValue(event.target.value);
  }

  const handleGenerateToken = () => {
    const auth = {
      email: `${emailValue}`,
      password: `${passwordValue}`,
    };
    generateTokenApi(auth).then((res) => {
      console.log("Token: ", res.data.payload.token);
      setCopyTextApiToken(res.data.payload.token);
    });
  };

  const CopyTextGetTokenHandler = () => {
    if (textRefGetToken.current) {
      textRefGetToken.current.select();
      document.execCommand("copy");
      setIsCopiedToken(true);
      setTimeout(() => {
        setIsCopiedToken(false);
      }, 1000);
    }
  };

  return (
    <div className="modal-box relative bg-whitesmoke">
      {/* head */}
      <div className="flex justify-between">
        <div>
          <span className="font-poppins text-xl font-black">Token</span>
        </div>
        <div>
          <label htmlFor="my-modal-token" className="btn btn-sm btn-circle">
            ✕
          </label>
        </div>
      </div>
      {/* create api token */}
      <div className="border-b-2 border-gray-300 py-3">
        <span className="capitalize text-xl font-poppins font-black">
          create aPI token
        </span>
      </div>
      {/* post url */}
      <div>
        <div className="my-2">
          <span className="text-sm text-gray-400">
            Note that the key is only available during creation time
          </span>
        </div>
        <div className="flex bg-white rounded-lg p-4 font-jetbrain text-lg font-semibold">
          <div className="mr-5">
            <span>Post</span>
          </div>
          <div>
            <span>/api/login</span>
          </div>
        </div>
      </div>
      {/* request body */}
      <div className="my-10">
        <div className="my-5">
          <span className="text-xl font-poppins font-black capitalize">
            request body
          </span>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-4 font-jetbrain text-lg font-semibold">
          <span>{"{"}</span>
          <span className="ml-5">
            "email":{" "}
            <input
              className="focus:outline-none"
              placeholder="example@gmail.com"
              value={emailValue}
              onChange={handleEmailChange}
            />
          </span>
          <span className="ml-5">
            "password":{" "}
            <input
              className="focus:outline-none"
              placeholder="password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </span>
          <span>{"}"}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleGenerateToken}
          className="text-yellow-400 text-lg font-poppins btn btn-ghost hover:btn-warning hover:delay-150 capitalize"
        >
          Generate
        </button>
      </div>
      <div>
        {/* copy link */}
        <div className="my-5 border-2 bg-white border-gray-400 rounded-md text-gray-400 text-xs px-5 flex justify-between items-center py-4">
          <div>
            <input
              type="text"
              ref={textRefGetToken}
              placeholder
              value={copyTextApiToken}
              readOnly
              disabled
              className="border-none bg-transparent"
            />
          </div>
          <div>
            <CopyToClipboard text={copyTextApiToken}>
              <button onClick={CopyTextGetTokenHandler}>
                <img src={isCopiedToken ? copiedIcon : copyIcon} alt="" />
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}
