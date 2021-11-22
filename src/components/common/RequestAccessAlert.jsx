import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

export default function RequestAccessAlert () {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Conecta tu wallet</AlertTitle>
      <AlertDescription>para acceder a la app</AlertDescription>
    </Alert>
  );
};
