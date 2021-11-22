import { Box } from "@chakra-ui/layout"
import { useEffect, useRef } from "react"
import { avatarsForPreview } from "../../../../config/avataaars"

export default function Preview() {
  const personitaImgRef = useRef(null)
  const counterRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      personitaImgRef.current.setAttribute('src', `https://avataaars.io/?${avatarsForPreview[counterRef.current]}`)
      counterRef.current = (counterRef.current + 1) % avatarsForPreview.length
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Box w="100%" display="flex" justifyContent="center" alignItems="center">
      <img
        ref={personitaImgRef}
        src="https://avataaars.io/?accessoriesType=Prescription02&clotheColor=Black&clotheType=Overall&eyeType=Happy&eyebrowType=SadConcernedNatural&facialHairColor=BlondeGolden&facialHairType=MoustacheFancy&hairColor=Blonde&mouthType=ScreamOpen&skinColor=Pale&topType=LongHairBob"
        alt="Personita"
      />
    </Box>
  )
}