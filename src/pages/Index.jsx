import { useState } from "react";
import { Container, VStack, Heading, Text, Button, Box, HStack, IconButton, FormControl, FormLabel, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { FaPlus, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleCreateEvent = () => {
    if (eventName && eventDate) {
      if (editingEvent) {
        // Update existing event
        const updatedEvents = events.map(event =>
          event.id === editingEvent.id ? { ...event, name: eventName, date: eventDate } : event
        );
        setEvents(updatedEvents);
        setSuccessMessage("Event updated successfully!");
      } else {
        // Create new event
        const newEvent = { id: Date.now(), name: eventName, date: eventDate };
        setEvents([...events, newEvent]);
        setSuccessMessage("Event created successfully!");
      }
      setEventName("");
      setEventDate("");
      setShowForm(false);
      setEditingEvent(null);
    } else {
      setSuccessMessage("Please fill in all fields.");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setEventDate(event.date);
    setShowForm(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setSuccessMessage("Event deleted successfully!");
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
                {editingEvent ? "Update Event" : "Submit"}
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
        <VStack spacing={4} width="100%">
          {events.map(event => (
            <Box key={event.id} width="100%" p={4} borderWidth={1} borderRadius="lg" display="flex" justifyContent="space-between" alignItems="center">
              <Text>{event.name} - {event.date}</Text>
              <HStack spacing={2}>
                <IconButton icon={<FaEdit />} onClick={() => handleEditEvent(event)} />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteEvent(event.id)} />
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;