import { render, screen } from '@testing-library/react';
import LaborerDetail from './LaborerDetail';
import { vi, expect } from 'vitest';

test('renders', () => {
  render(<LaborerDetail laborer={0} handleGoToLaborersPage={vi.fn()}/>);
  expect(screen.getByText(/Role/i)).toBeDefined();
});