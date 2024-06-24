import {useState, useEffect}  from "react";
import useWindowDimensions from "../assets/function/useWindowDimentions";

const YoutubeEmb = ({ 
    height = '90%',
    width= '90%',
    frameBorder=0,
    borderRadius=10,
    title = 'Video',
    embedId = '-sxfriO_IV0'
        }) => {
            const {widthS, heightS} = useWindowDimensions();
            const [update, setUpdate] = useState(false);
            useEffect(()=>{
                setUpdate(p=>!p);
            },[widthS, heightS])

            return(
            <div className="video-responsive alignCenter">
            <iframe
                className="boxShadow"
                style={{borderRadius:`${borderRadius}px`, border:'1px solid rgba(0,0,0,0.8)'}}
                width={width}
                height={height}
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder={`${frameBorder}`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                title={title}
            />
            </div>)
        };

export default YoutubeEmb;