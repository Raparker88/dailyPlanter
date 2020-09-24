import React from "react"
// import {CropImageContext} from "./ImageProvider"
import "./Crop.css"


export const ImageList = ({image}) => {
    // const {images, getImages} = useContext(CropImageContext)
    // const [cropImages, setImages] = useState([])

    // useEffect(() => {
    //     getImages()
    // },[])

    // useEffect(() => {
    //     const cropId = parseInt(props.match.params.cropId)
    //     const cImages = images.filter(i => i.cropId === cropId) || []
    //     setImages(cImages)
    // },[images])

  
       
    return (
        <div className="image" key={image.id}>
            <img src={image.imageURL} style="width:100%"></img>
            <div className="imageContent"><p>{image.label}</p></div>
        </div>
    )
         
}