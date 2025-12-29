import { CalendarProvider } from './context/CalendarContext';
import Calendar from './pages/Calendar/Calendar';

function App(): JSX.Element {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
