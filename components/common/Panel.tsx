import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const panelStyle = css`
  border-radius: 8px;
  background: var(--panel);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`;

export const Section = styled.section`
  padding: 1rem;
`;

export const Panel = styled.div(panelStyle);
