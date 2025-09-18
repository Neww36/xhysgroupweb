/* Local shim types for @chakra-ui/react to unblock build of react-bits examples.
   Safe to remove once upstream removes dependency or project installs the real package. */
declare module "@chakra-ui/react" {
  import * as React from "react"
  export interface ChakraProps {
    className?: string
    children?: React.ReactNode
    onClick?: (e: React.MouseEvent) => void
    [key: string]: unknown
  }
  export const Icon: React.FC<ChakraProps>
  export const ChakraProvider: React.FC<ChakraProps>
  export const Box: React.FC<ChakraProps>
  export const Flex: React.FC<ChakraProps>
  export const Stack: React.FC<ChakraProps>
  export const Text: React.FC<ChakraProps>
  export const Button: React.FC<ChakraProps>
}