import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  Text,
  Icon,
  IconButton,
  Image,
  Box,
} from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Card from "./../components/Card";
import { Modal } from "../components/Modal";
import { useDisclosure } from "@chakra-ui/hooks";
import Tilt from "react-tilt";

export function Home() {
  const [characters, setCharacters] = useState([]);
  const [oneCharacter, setOneCharacter] = useState({});
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function getAllCharacters() {
    try {
      const localData = localStorage.getItem("data");

      if (!!localData) {
        const localDataJson = JSON.parse(localData);
        setCharacters(localDataJson.results);
        setPagination(localDataJson.info);
      } else {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results);
        setPagination(data.info);

        localStorage.setItem("data", JSON.stringify(data));
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  async function getCharacterById(id) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response.json();
    setOneCharacter({ ...data });
  }

  async function handleSearch() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${inputSearch}`
    );
    const data = await response.json();
    setCharacters(data.results);
    setPagination(data.info);
    setCurrentPage(1);
  }

  function handleOrder(order) {
    let orderedCharacters;

    if (order === "asc") {
      orderedCharacters = characters.sort((a, b) => (a.name > b.name ? 1 : -1));
    }

    if (order === "desc") {
      orderedCharacters = characters.sort((a, b) => (b.name < a.name ? -1 : 1));
    }

    if (order === "") {
      orderedCharacters = characters.sort((a, b) => a.id - b.id);
    }

    setCharacters([...orderedCharacters]);
  }

  function handleOpenModal(id) {
    setOneCharacter("");
    getCharacterById(id);
    onOpen();
  }

  async function handleNextPage() {
    const response = await fetch(pagination.next);
    const data = await response.json();

    setCharacters(data.results);
    setPagination(data.info);
    setCurrentPage((props) => ++props);
  }

  async function handlePreviousPage() {
    const response = await fetch(pagination.prev);
    const data = await response.json();

    setCharacters(data.results);
    setPagination(data.info);
    setCurrentPage((props) => --props);
  }

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <Container maxW={"7xl"}>
      <Flex justify="center" align="center" direction="column" gap={4}>
        <Image
          mt={10}
          w={300}
          h={300}
          objectFit="cover"
          rounded="full"
          src="/logo.jpg"
        />

        <Flex gap={2}>
          <Input
            name="search"
            placeholder="Search"
            focusBorderColor="green.400"
            onChange={(event) => setInputSearch(event.target.value)}
          />
          <Button
            bgColor="green.400"
            _hover={{ bgColor: "green.500" }}
            onClick={() => handleSearch()}
          >
            Search
          </Button>
        </Flex>
      </Flex>

      <InputGroup mt={8} justifyContent={"center"} mr="36">
        <InputLeftAddon
          color="white"
          bgColor="green.400"
          children="Ordenar por"
          border="none"
        />
        <Select
          w={"fit-content"}
          color="green.400"
          fontWeight={700}
          focusBorderColor="green.400"
          onChange={(event) => {
            handleOrder(event.target.value);
          }}
        >
          <option value="">ID</option>
          <option value="asc">Nome A-Z</option>
          <option value="desc">Nome Z-A</option>
        </Select>
      </InputGroup>

      <List mt={8}>
        <Flex
          flexWrap={"wrap"}
          alignContent={"center"}
          justifyContent="center"
          gap={8}
        >
          {characters.map((character) => (
            <Tilt
              transitionEasing="linear"
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
            >
              <ListItem key={character.id}>
                <Card
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  status={character.status}
                  species={character.species}
                  cursor="pointer"
                  onClick={() => handleOpenModal(character.id)}
                />
              </ListItem>
            </Tilt>
          ))}
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={4}
          pb={10}
          pt={10}
        >
          <Text>
            Página {currentPage} de {pagination?.pages + 1}
          </Text>

          <Flex gap={4} justify="center" align="center">
            <IconButton
              bgColor="transparent"
              onClick={() => handlePreviousPage()}
              disabled={!pagination.prev}
              _hover={{ bgColor: "green.400" }}
              icon={<Icon w={8} h={8} as={GrPrevious} />}
            />

            <IconButton
              bgColor="transparent"
              onClick={() => handleNextPage()}
              disabled={!pagination.next}
              _hover={{ bgColor: "green.400" }}
              color="greenyellow"
              icon={<Icon w={8} h={8} as={GrNext} />}
            />
          </Flex>
        </Flex>
      </List>

      <Modal isOpen={isOpen} onClose={onClose} character={oneCharacter} />
    </Container>
  );
}
