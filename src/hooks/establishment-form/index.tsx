import { useContext } from 'react';
import { EstablishmentFormContext } from '../../context/establishment-form-context';

export function useEstablishmentForm() {
  const context = useContext(EstablishmentFormContext);
  if (!context) {
    console.error('No Establishment Form Context found');
  }

  return context;
}
