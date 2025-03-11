import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import BirthdayList from './components/BirthdayList';
import BirthdayForm from './components/BirthdayForm';
import api from './services/api';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBirthday, setEditingBirthday] = useState(null);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      setLoading(true);
      const response = await api.get('/birthdays/');
      setBirthdays(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching birthdays:', err);
      setError('Failed to load birthdays. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBirthday = async (birthdayData) => {
    try {
      setError(null);
      console.log('Adding birthday with data:', birthdayData);
      const response = await api.post('/birthdays/', birthdayData);
      setBirthdays([...birthdays, response.data]);
    } catch (err) {
      console.error('Error adding birthday:', err);
      const errorMessage = err.response && err.response.data 
        ? JSON.stringify(err.response.data) 
        : 'Failed to add birthday. Please try again.';
      setError(`Error: ${errorMessage}`);
    }
  };

  const handleUpdateBirthday = async (id, birthdayData) => {
    try {
      setError(null);
      console.log('Updating birthday with data:', birthdayData);
      const response = await api.put(`/birthdays/${id}/`, birthdayData);
      setBirthdays(
        birthdays.map((birthday) => (birthday.id === id ? response.data : birthday))
      );
      setEditingBirthday(null);
    } catch (err) {
      console.error('Error updating birthday:', err);
      const errorMessage = err.response && err.response.data 
        ? JSON.stringify(err.response.data) 
        : 'Failed to update birthday. Please try again.';
      setError(`Error: ${errorMessage}`);
    }
  };

  const handleDeleteBirthday = async (id) => {
    try {
      await api.delete(`/birthdays/${id}/`);
      setBirthdays(birthdays.filter((birthday) => birthday.id !== id));
    } catch (err) {
      console.error('Error deleting birthday:', err);
      setError('Failed to delete birthday. Please try again.');
    }
  };

  const startEditing = (birthday) => {
    setEditingBirthday(birthday);
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Birthday Reminder</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Row>
          <Col md={4}>
            <h2>Add Birthday</h2>
            <BirthdayForm 
              onSubmit={editingBirthday ? 
                (data) => handleUpdateBirthday(editingBirthday.id, data) : 
                handleAddBirthday} 
              initialData={editingBirthday}
              onCancel={() => setEditingBirthday(null)}
            />
          </Col>
          <Col md={8}>
            <h2>Birthdays</h2>
            <BirthdayList 
              birthdays={birthdays} 
              loading={loading} 
              onEdit={startEditing}
              onDelete={handleDeleteBirthday}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App; 