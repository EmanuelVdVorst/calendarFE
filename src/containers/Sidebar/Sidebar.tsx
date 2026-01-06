import styled from 'styled-components';
// import MiniCalendar from './MiniCalendar';
import UpcomingEvents from '../../components/EventOverview/EventOverview';
import { MiniCalendar } from '../../components/calendar/calendar';
import { colors, paddings } from '../../components/basics/Styles';


const SidebarContainer = styled.div({
  width: '280px',
  backgroundColor: colors.background,
  borderRight: `1px solid ${colors.border}`,
  display: 'flex',
  flexDirection: 'column',
  padding: paddings.medium,
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
