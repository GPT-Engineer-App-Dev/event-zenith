import { useState } from "react";
import { Container, VStack, Heading, Text, Button, Box, HStack, IconButton, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateEvent = () => {
    // Simple validation
    if (eventName && eventDate) {
      // Store event in temporary state (for now, just log it)
      console.log("Event Created:", { name: eventName, date: eventDate });
      setSuccessMessage("Event created successfully!");
      setEventName("");
      setEventDate("");
      setShowForm(false);
    } else {
      setSuccessMessage("Please fill in all fields.");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Events Management
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Manage your events efficiently and effortlessly.
        </Text>
        <HStack spacing={4}>
          <Button leftIcon={<FaPlus />} colorScheme="teal" size="lg" onClick={() => setShowForm(true)}>
            Create Event
          </Button>
          <Button leftIcon={<FaCalendarAlt />} colorScheme="blue" size="lg">
            View Events
          </Button>
        </HStack>
        {showForm && (
          <Box width="100%" p={4} borderWidth={1} borderRadius="lg">
            <VStack spacing={4}>
              <FormControl id="event-name" isRequired>
                <FormLabel>Event Name</FormLabel>
                <Input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              </FormControl>
              <FormControl id="event-date" isRequired>
                <FormLabel>Event Date</FormLabel>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </FormControl>
              <Button colorScheme="teal" onClick={handleCreateEvent}>
                Submit
              </Button>
            </VStack>
          </Box>
        )}
        {successMessage && (
          <Alert status="success">
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default Index;