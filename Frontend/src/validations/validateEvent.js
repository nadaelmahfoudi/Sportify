const validateEvent = (formData) => {
    const errors = {};
  
    // Title validation
    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
  
    // Description validation
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    } else if (formData.description.length < 20) {
      errors.description = "Description must be at least 20 characters.";
    }
  
    // Date validation
    if (!formData.date) {
      errors.date = "Date is required.";
    } else {
      const eventDate = new Date(formData.date);
      const today = new Date();
      if (eventDate < today) {
        errors.date = "Date must be in the future.";
      }
    }
  
    // Location validation
    if (!formData.location.trim()) {
      errors.location = "Location is required.";
    }
  
    // Image validation
    if (formData.image && !["image/jpeg", "image/png"].includes(formData.image.type)) {
      errors.image = "Only JPEG and PNG formats are allowed.";
    }
  
    return errors;
  };
  
  export default validateEvent;
  