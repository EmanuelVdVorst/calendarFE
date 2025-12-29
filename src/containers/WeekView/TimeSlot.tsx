import styled from 'styled-components';

interface TimeSlotProps {
  date: Date;
  hour: number;
  onClick: (date: Date, hour: number) => void;
}

const SlotContainer = styled.div({
  height: '60px',
  borderRight: '1px solid #E0E0E0',
  borderBottom: '1px solid #F0F0F0',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  '&:hover': {
    backgroundColor: '#F5F8FF',
  },

  '&:last-child': {
    borderRight: 'none',
  },
});

function TimeSlot({ date, hour, onClick }: TimeSlotProps): JSX.Element {
  const handleClick = (): void => {
    onClick(date, hour);
  };

  return <SlotContainer onClick={handleClick} />;
}

export default TimeSlot;
