import { useParams } from "react-router-dom";
import { Container, Heading, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details based on the ID
    const fetchEventDetails = async () => {
      // Simulate fetching event details from an API or state
      const events = JSON.parse(localStorage.getItem("events")) || [];
      const eventDetails = events.find(event => event.id === parseInt(id));
      setEvent(eventDetails);
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return (
      <Container centerContent>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="lg" width="100%">
        <Heading as="h2" size="xl" mb={4}>{event.name}</Heading>
        <Text fontSize="lg" mb={2}><strong>Date:</strong> {event.date}</Text>
        <Text fontSize="md"><strong>Description:</strong> {event.description || "No description available."}</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;