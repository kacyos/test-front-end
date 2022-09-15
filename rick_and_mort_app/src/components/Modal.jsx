import {
  ModalOverlay,
  Modal as ChakraModal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Image,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";

export function Modal({ isOpen, onClose, character }) {
  return (
    <>
      <ChakraModal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor="green.800">
          <ModalHeader>{character.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Flex
              direction={"column"}
              justifyContent="center"
              alignItems="center"
              gap={4}
            >
              <Image
                rounded="full"
                src={character.image}
                alt={character.name}
                w={200}
                h={200}
              />
              <Flex
                direction={"column"}
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Heading fontSize="md">{character.name}</Heading>
                <Text>
                  {character.status} - {character.species}
                </Text>
                <Text>Origin: {character.origin?.name}</Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
