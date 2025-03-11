import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BirthdayForm = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [notes, setNotes] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDateOfBirth(initialData.date_of_birth ? new Date(initialData.date_of_birth) : null);
      setNotes(initialData.notes || '');
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setName('');
    setDateOfBirth(null);
    setNotes('');
    setValidated(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formattedDate = dateOfBirth ? 
      `${dateOfBirth.getFullYear()}-${String(dateOfBirth.getMonth() + 1).padStart(2, '0')}-${String(dateOfBirth.getDate()).padStart(2, '0')}` : 
      null;

    const birthdayData = {
      name,
      date_of_birth: formattedDate,
      notes
    };

    onSubmit(birthdayData);
    
    if (!initialData) {
      resetForm();
    }
  };

  return (
    <div className="birthday-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="form-control"
            placeholderText="Select date of birth"
            required
          />
          {validated && !dateOfBirth && (
            <div className="invalid-feedback d-block">
              Please select a date of birth.
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>Notes (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            {initialData ? 'Update' : 'Add'} Birthday
          </Button>
          {initialData && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default BirthdayForm; 