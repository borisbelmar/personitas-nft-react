import { Container, Stack } from "@chakra-ui/layout";
import Hero from "./components/Hero";
import Preview from "./components/Preview";

export default function Home() {
  return (
    <Container px="4" maxW="6xl">
      <Stack spacing="12" direction={{ base: 'column-reverse', md: 'row' }}>
        <Hero />
        <Preview />
      </Stack>
    </Container>
  )
}
