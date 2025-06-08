export interface ButtonConfig {
  buttonText: string;
  buttonClass: string;
  modalTarget: string;
  modalToggle: boolean;
  isDisabled: boolean;
  action: () => void;
} 