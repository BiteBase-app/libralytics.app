import React, { useEffect, useMemo, useState } from 'react';

const divsDef = [
  { id: 1, text: 'Div 1' },
  { id: 2, text: 'Div 2' },
  { id: 3, text: 'Div 3' },
  { id: 4, text: 'Div 4' },
  { id: 5, text: 'Div 5' },
  { id: 6, text: 'Div 6' },
  { id: 7, text: 'Div 7' },
  { id: 8, text: 'Div 8' },
];

const DelayedDivs = () => {
  const [divs, setDivs] = useState<JSX.Element[] | any>([]);

  const divsToRender = useMemo(
    () => divsDef.map((div) => <div key={div.id}>{div.text}</div>),
    [divsDef]
  );

  useEffect(() => {
    const timerIds: any[] = [];

    // Add the first element to the state
    setDivs([divsToRender[0]]);

    // Use setDivs to add new elements to the state
    for (let i = 1; i < divsToRender.length; i += 1) {
      const timerId = setTimeout(() => {
        setDivs((prevDivs: any) => [...prevDivs, divsToRender[i]]);
      }, i * 500);
      timerIds.push(timerId);
    }

    // Clear all timers when the component unmounts
    return () => {
      timerIds.forEach((id) => clearTimeout(id));
    };
  }, [divsToRender]);

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{divs}</div>;
};

export default DelayedDivs;
