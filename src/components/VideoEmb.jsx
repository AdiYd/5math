import {useState, useEffect}  from "react";
import useWindowDimensions from "../assets/function/useWindowDimentions";

const promoVid = "https://iframe.mediadelivery.net/embed/12116/92763489-03f2-4bea-903c-9460602ad755?autoplay=true&amp;muted=false";

const VideoEmb = ({ 
    height = '90%',
    width= '90%',
    frameBorder=0,
    borderRadius=12,
    title = 'Video',
    src = promoVid
        }) => {
            const {widthS, heightS} = useWindowDimensions();
            const [update, setUpdate] = useState(false);
            useEffect(()=>{
                setUpdate(p=>!p);
            },[widthS, heightS])

            return(
            <div className="video-responsive alignCenter">
            <iframe
                className="border"
                style={{borderRadius:`${borderRadius}px`, background:'white', maxHeight:'80vh'}}
                width={width}
                height={height}
                src = {src}
                frameBorder={`${frameBorder}`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                title={title}
                color="green"
            />
            </div>)
        };

export default VideoEmb;