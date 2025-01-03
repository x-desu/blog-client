import { IKImage } from "imagekitio-react"

const Image = ({src,className,w,h,alt}) => {
  return (
    <IKImage 
    urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
    path={src || null} 
    alt={alt} 
    className={className}
    lqip={{ active: true, quality: 20 }}
    loading="lazy"
    width={w}
    height={h}
    transformation={[
      {
        width:w,
        height:h
      }
    ]}
    />
  )
}

export default Image