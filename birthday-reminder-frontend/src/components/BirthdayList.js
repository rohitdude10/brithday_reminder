import React from 'react';
import { Card, Button, Row, Col, Spinner, Badge } from 'react-bootstrap';

const BirthdayList = ({ birthdays, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (birthdays.length === 0) {
    return (
      <div className="text-center my-5">
        <p>No birthdays found. Add a birthday to get started!</p>
      </div>
    );
  }

  // Function to calculate days until next birthday
  const getDaysUntilBirthday = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Set birth date to current year
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    
    // If birthday has passed this year, set to next year
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate difference in days
    const diffTime = nextBirthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Function to calculate age
  const getAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Sort birthdays by days until next birthday
  const sortedBirthdays = [...birthdays].sort((a, b) => {
    return getDaysUntilBirthday(a.date_of_birth) - getDaysUntilBirthday(b.date_of_birth);
  });

  return (
    <Row>
      {sortedBirthdays.map((birthday) => {
        const daysUntil = getDaysUntilBirthday(birthday.date_of_birth);
        const age = getAge(birthday.date_of_birth);
        const nextAge = age + 1;
        
        return (
          <Col key={birthday.id} md={6} lg={6}>
            <Card className="birthday-card">
              <Card.Body>
                <Card.Title>{birthday.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(birthday.date_of_birth).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>
                  <Badge bg={daysUntil <= 7 ? 'danger' : daysUntil <= 30 ? 'warning' : 'info'}>
                    {daysUntil === 0 ? 'Today!' : `${daysUntil} days until birthday`}
                  </Badge>
                  <br />
                  <small>Current age: {age} (Turning {nextAge})</small>
                  {birthday.notes && (
                    <>
                      <br />
                      <small className="text-muted">{birthday.notes}</small>
                    </>
                  )}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" size="sm" onClick={() => onEdit(birthday)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onDelete(birthday.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default BirthdayList; 