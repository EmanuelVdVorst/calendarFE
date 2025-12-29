import styled from 'styled-components';
// import MiniCalendar from './MiniCalendar';
import UpcomingEvents from '../../components/EventOverview/EventOverview';
import { MiniCalendar } from '../../components/calendar/calendar';


const SidebarContainer = styled.div({
  width: '280px',
  backgroundColor: '#F5F5F7',
  borderRight: '1px solid #E0E0E0',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  overflowY: 'auto',
});

function 
Sidebar(): JSX.Element {
  return (
    <SidebarContainer>
      <MiniCalendar />
      <UpcomingEvents />
    </SidebarContainer>
  );
}

export default Sidebar;
