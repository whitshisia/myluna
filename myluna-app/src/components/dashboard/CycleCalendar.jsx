import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import Card from '../shared/Card';

export default function CycleCalendar({ cycleData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getPeriodDays = () => {
    const days = {};
    if (cycleData?.periodHistory) {
      cycleData.periodHistory.forEach(period => {
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const periodDays = eachDayOfInterval({ start, end });
        periodDays.forEach(day => {
          days[format(day, 'yyyy-MM-dd')] = true;
        });
      });
    }
    return days;
  };

  const periodDays = getPeriodDays();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDayStatus = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (periodDays[dateStr]) return 'period';
    if (isSameDay(date, new Date())) return 'today';
    return 'normal';
  };

  const dayStyles = {
    period: 'bg-rose text-white hover:bg-rose-dk',
    today: 'border-2 border-rose text-rose hover:bg-rose-lt',
    normal: 'text-plum hover:bg-rose-lt'
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-muted hover:text-rose text-xl">
          ‹
        </button>
        <h3 className="text-lg font-medium text-plum">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button onClick={nextMonth} className="text-muted hover:text-rose text-xl">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-muted font-medium py-1">
            {day}
          </div>
        ))}
        
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {days.map((date, index) => {
          const status = getDayStatus(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          return (
            <button
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`
                w-full aspect-square rounded-full flex items-center justify-center text-sm
                transition-all hover:scale-105
                ${!isCurrentMonth ? 'text-rose-md/50' : ''}
                ${dayStyles[status] || dayStyles.normal}
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-rose-lt">
        <div className="flex items-center gap-1 text-xs text-muted">
          <div className="w-3 h-3 rounded-full bg-rose" />
          Period
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <div className="w-3 h-3 rounded-full border-2 border-rose" />
          Today
        </div>
      </div>

      {/* Selected date info */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-blush rounded-xl text-sm">
          <p className="font-medium text-plum">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="text-muted mt-1">
            {periodDays[format(selectedDate, 'yyyy-MM-dd')] 
              ? '🩸 Period day' 
              : 'No period logged'}
          </p>
        </div>
      )}
    </Card>
  );
}