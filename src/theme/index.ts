import { createSystem, defaultConfig } from "@chakra-ui/react"
import { colors } from "./colors"
import { fonts } from "./fonts"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      fonts,
    },
  },
})

export default system