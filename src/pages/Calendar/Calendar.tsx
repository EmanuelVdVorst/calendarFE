import Sidebar from '../../containers/Sidebar/Sidebar';
import WeekNavigation from '../../components/Navigation/WeekNavigation';
import WeekView from '../../containers/WeekView/WeekView';
import { CalendarContainer, MainContent } from './Calendar.styles';

function Calendar(): JSX.Element {
  return (
    <CalendarContainer>
      <Sidebar />
      <MainContent>
        <WeekNavigation />
        <WeekView />
      </MainContent>
    </CalendarContainer>
  );
}

export default Calendar;
