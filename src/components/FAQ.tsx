import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import * as React from 'react';

import { FAQs } from './ContentEnglish';

export default function FAQ() {
  return (
    <>
      {FAQs.map((page) => (
        <Accordion key={page.i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'start', fontWeight: 'bold', color: '#4b5563' }}
            >
              {page.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="h6"
              sx={{ textAlign: 'start', color: '#4b5563' }}
            >
              {page.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
