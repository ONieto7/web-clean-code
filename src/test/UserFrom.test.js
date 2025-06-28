
// src/__tests__/MemoryRouter.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('MemoryRouter import works', () => {
  render(
    <MemoryRouter>
      <div>Test</div>
    </MemoryRouter>
  );
});