import styled from 'styled-components';
import MiniCalendar from './MiniCalendar';
import UpcomingEvents from './UpcomingEvents';

const SidebarContainer = styled.div`
  width: 280px;
  background-color: #F5F5F7;
  border-right: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
`;

function Sidebar(): JSX.Element {
  return (
    <SidebarContainer>
      <MiniCalendar />
      <UpcomingEvents />
    </SidebarContainer>
  );
}

export default Sidebar;
