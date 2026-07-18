export interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  honeypot: string; // Anti-spam hidden honeypot
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const validateForm = (values: FormState): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name check
  if (!values.name.trim()) {
    errors.name = "Trainer Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = "Trainer Email is required.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // Subject check
  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  // Message check
  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }

  return errors;
};
