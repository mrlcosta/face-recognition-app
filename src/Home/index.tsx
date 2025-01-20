import { 
  Text, 
  TouchableOpacity, 
  useWindowDimensions, 
  View 
} from 'react-native'
import { 
  useEffect, 
  useState,
  useRef
} from 'react'
import {
  Frame,
  useCameraDevice,
  useCameraPermission,
  Camera as VisionCamera
} from 'react-native-vision-camera'

import { styles } from './styles'
import { Face, FaceDetectionOptions, Camera,  } from 'react-native-vision-camera-face-detector'

export  function Home() {

  const [faceDetected, setFaceDetected] = useState<boolean>(false)
  const [isActive, setIsActive] =useState<boolean>(false)

  const {
    hasPermission,
    requestPermission
  } = useCameraPermission()

  if(!hasPermission) {
    requestPermission()
    console.log('Not camera permission')
  }

  const {
    width,
    height
  } = useWindowDimensions()
  

  const faceDetectionOptions = useRef<FaceDetectionOptions>( {
    performanceMode: 'fast', 
    classificationMode:'all'

  } ).current


  const device = useCameraDevice('front')

  if(!device){
    console.log('device =>', device)
    return
  }


  function handleFacesDetection(
    faces: Face[],
    frame: Frame
  ): void { 
    
    const face = faces[0] 

    if (face) {

      // console.log(face)
      if(face.leftEyeOpenProbability > 0.5 && face.rightEyeOpenProbability < 0.5){
        console.log('piscou o olho ESQUERDO')
       
      }
      if(face.leftEyeOpenProbability < 0.5 && face.rightEyeOpenProbability > 0.5){
        console.log('piscou o olho DIREITO')
      }

    }

    

   
  }

  return (
    <View style={styles.container}>
       <Camera
        isActive={isActive}
        style={styles.camera}
        device={device}   
        faceDetectionCallback={handleFacesDetection}
        faceDetectionOptions={faceDetectionOptions}          
     />


    <TouchableOpacity onPress={(e) => setIsActive(true)}>
      <Text>
        ativar
      </Text>
    </TouchableOpacity>

    </View>
  )
}