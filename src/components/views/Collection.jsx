import { Container, Grid, Heading, Stack } from "@chakra-ui/layout";
import Loading from "../common/Loading";
import PersonitaCard from "../common/PersonitaCard";
import RequestAccessAlert from "../common/RequestAccessAlert";
import SearchBar from "../common/SearchBar";
import { usePersonitasDataContext } from "../context/PersonitasDataContext";

export default function Collection() {
  const { personitas, loading, disconnected } = usePersonitasDataContext()

  if (disconnected) {
    return (
      <Container px="4" py="6" maxW="6xl">
        <RequestAccessAlert />
      </Container>
    )
  }

  return (
    <Container px="4" maxW="6xl">
      <Stack spacing="6" py="4" direction="column">
        <Heading as="h1" size="lg" color="gray.700">All Personitas</Heading>
        <Stack spacing="8">
          <SearchBar />
          {loading ? (
            <Loading />
          ) : (
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
              {personitas.map(personita => (
                <PersonitaCard key={personita.tokenId} personita={personita} />
              ))}
            </Grid>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
