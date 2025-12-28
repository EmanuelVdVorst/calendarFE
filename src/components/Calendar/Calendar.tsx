import Sidebar from '../Sidebar/Sidebar';
import WeekNavigation from '../Navigation/WeekNavigation';
import WeekView from '../WeekView/WeekView';
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
