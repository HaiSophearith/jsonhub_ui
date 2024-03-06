import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import copyIcon from "../../asset/icon/copyIconDoc.svg";
import copiedIcon from "../../asset/icon/copiedIcon.svg";
import { getApikey, getProjectName, updateProjectsApiKeyApi } from "../../redux/service/ProjectService";

export default function PopUpForApiKeyOption({project}) {

  const textRefGetApiToken = useRef(null);
  const [copyTextApiKey, setCopyTextApiKey] = useState("");
  const [isCopiedApiToken, setIsCopiedApiToken] = useState(false);
  const [apikey,setApikey] = useState("")



  useEffect(()=>{
    getApikey(project).then((response)=>{
      setApikey(response.data.payload)
    }).catch((err)=>{
      console.log(err)
    })
  },[])


  const CopyTextGetApiTokenHandler = () => {
    if (textRefGetApiToken.current) {
      textRefGetApiToken.current.select();
      document.execCommand("copy");
      setIsCopiedApiToken(true);
      setTimeout(() => {
        setIsCopiedApiToken(false);
      }, 1000);
    }
  };

  const handleGenerateApiKey = () => {
    var uuid = crypto.randomUUID();
    setApikey(uuid)
    getProjectName(project).then((response)=>{
      updateProjectsApiKeyApi(response.data.payload,uuid);
    })
  };

  return (
    <div className="modal-box relative font-poppins bg-whitesmoke">
      {/* head */}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-black text-xl font-poppins">API Key</span>
        </div>
        <div className="">
          <label htmlFor="my-modal-apiKey" className="btn btn-sm btn-circle">
            ✕
          </label>
        </div>
      </div>
      {/* copy link */}
      <div className="my-5 border-2 bg-white border-gray-400 h-14 rounded-md text-gray-400 text-xs px-5 flex justify-between py-4 items-center">
        <div>
          <input
            type="text"
            ref={textRefGetApiToken}
            placeholder
            value={apikey}
            readOnly
            disabled
            className="border-none bg-transparent"
          />
        </div>
        <div>
          <CopyToClipboard text={apikey}>
            <button onClick={CopyTextGetApiTokenHandler}>
              <img src={isCopiedApiToken ? copiedIcon : copyIcon} alt="" />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      {/* Button create */}
      <div className="py-3 flex justify-center">
        <label
          onClick={handleGenerateApiKey}
          htmlFor="my-modal-generate"
          className="text-yellow-400 text-lg font-poppins btn btn-ghost hover:btn-warning hover:delay-150 capitalize"
        >
          new API Key
        </label>
      </div>
    </div>
  );
}
