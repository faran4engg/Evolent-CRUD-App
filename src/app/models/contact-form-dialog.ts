/**
 * An Interface for Contact Form
 * Enforces compile time checking
 * Also, used for better Linting
 */
export interface ContactFormDialog {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  status: string;
  id: string;
}
