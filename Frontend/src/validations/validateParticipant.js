const validateParticipant = ({ name, phoneNumber, eventName }) => {
    const errors = {};
  
    // Validate name
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
  
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
  
    // Validate event
    if (!eventName) {
      errors.eventName = 'Please select an event';
    }
  
    return errors;
  };
  
  export default validateParticipant;
  