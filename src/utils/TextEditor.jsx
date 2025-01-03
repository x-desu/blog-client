import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GifPicker from "gif-picker-react"
import { useRef, useState } from "react"


const TextEditor = ({handleComment}) => {
    const [showgif,setShowGif] = useState(false)
    const inputRef = useRef(null); // Reference to the editable div

    const getTextAndImages = () => {
        const htmlContent = inputRef.current.innerHTML;
      
        // Extract all text (stripping out HTML tags, except for the images)
        let textContent = inputRef.current.textContent || inputRef.current.innerText;
        textContent = textContent.trim().replace(/\s+/g, ' '); 
        // Extract all image URLs using a regular expression
        const imageUrls = [];
        const imgTags = htmlContent.match(/<img [^>]*src="([^"]+)"[^>]*>/g);
    
        if (imgTags) {
          imgTags.forEach((imgTag) => {
            const urlMatch = imgTag.match(/src="([^"]+)"/);
            if (urlMatch) {
              imageUrls.push(urlMatch[1]); // Extract URL
            }
          });
        }
    
        handleComment( textContent, imageUrls )
        inputRef.current.innerHTML = ""
      };

      const handleGIF = (gif) => {
        if(inputRef.current){
            inputRef.current.innerHTML +=`
            <div className="inline-block w-20 h-20 overflow-hidden">
            <img src=${gif?.preview?.url} alt="GIf" className="object-cover w-full h-full"/>
            </div></br>
            `
        }
        setShowGif(false)
      }

  return (
    <div className=" relative flex gap-4 justify-between items-center w-full">
            <div className=" focus:outline-none w-full field-sizing-content  p-4 rounded-xl text-black bg-neutral-50/60 text-black dark:text-slate-100 dark:bg-neutral-900/60" 
            placeholder="write a comment..."
            ref={inputRef}
            contentEditable
            
            ></div>
             <FontAwesomeIcon 
        icon={faImage} onClick={()=>setShowGif(prev=>!prev)}
        className="text-2xl "
        />
        <div className={`absolute z-10 right-10 top-20 sm:top-15 sm:-right-0  lg:top-15 lg:-right-70 transition-all duration-300 ease-in-out ${
          showgif ? " opacity-100" : " opacity-0 pointer-events-none"
        }`}>
        {showgif && <GifPicker 
        tenorApiKey={import.meta.env.VITE_TENOR_KEY}
        theme="dark"
        onGifClick={handleGIF}
        
        />}
        </div>
            <button onClick={getTextAndImages} className="bg-blue-800 text-white dark:text-slate-100 font-medium px-4 py-3 rounded-xl">Send</button>
        </div>
  )
}

export default TextEditor