import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";

export default function Card({
  name,
  status,
  species,
  image,
  keyValue,
  ...rest
}) {
  return (
    <Box
      key={keyValue}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius={4}
      w={270}
      h={300}
      borderColor="green.300"
      bgColor="green.800"
      {...rest}
    >
      <Flex direction={"column"} gap={4} alignItems="center">
        <Image rounded="full" src={image} alt={name} w={200} h={200} />

        <Flex direction={"column"} justify="center" align="center">
          <Heading fontSize="md">{name}</Heading>
          <Text>
            {status} - {species}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
