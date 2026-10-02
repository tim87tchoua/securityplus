import type { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <Box p={6}>{children}</Box>
}
