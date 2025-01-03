import { IKContext, IKUpload } from "imagekitio-react";
import { toast } from "react-toastify";
import useTheme from "../context/ThemeContext";
import { useRef } from "react";

const authenticator =  async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post/upload-auth`);
  
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

const Upload = ({children,type,setProgress,setData,setLocalUrl}) => {
    const ref = useRef()
    const {theme} = useTheme()
    
    const onUploadProgress = progress => {
        
        setProgress(Math.round((progress.loaded/progress.total)*100))
      };

      const onSuccess = (res) => {
        
        setData(res)
        toast.success("Post has been created",{
            theme:theme
          })
      }

      const onError = (err) => {
        console.log("Error", err)
            toast.error("Image upload failed!",{
              theme:theme
            })
      }

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && setLocalUrl) {
            setLocalUrl(URL.createObjectURL(file));  // Set the local file preview
        }
    };

  return (
    <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} 
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator} >
        <IKUpload
          useUniqueFileName
          onChange={handleFileChange}
          onError={onError}
          onSuccess={onSuccess}
          accept={`${type}/*`}
          onUploadProgress={onUploadProgress}
          className="hidden"
          ref={ref}
          />
          <div className="" onClick={() => ref.current.click()}>
            {children}
          </div>
        </IKContext>
  )
}

export default Upload