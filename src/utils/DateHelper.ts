class DateHelper {
  stepTime: number;
  startHours: number;
  endHours: number;
  constructor() {
    this.stepTime = 15 * 60 * 1000;
    this.startHours = 12;
    this.endHours = 21;
  }
  checkCurrentDay(firstDate: Date, endDate: Date) {
    return (
      firstDate.getDate() === endDate.getDate() &&
      firstDate.getHours() >= this.startHours &&
      endDate.getHours() <= this.endHours
    );
  }
  createTimeMapByDate(date: Date): Date[] {
    const timeMap = [];
    const firstTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      this.startHours,
      0,
      0,
      0,
    );
    const endTime = new Date(firstTime);
    while (this.checkCurrentDay(firstTime, endTime)) {
      timeMap.push(new Date(endTime.getTime()).toISOString());
      endTime.setTime(endTime.getTime() + this.stepTime);
    }
    return timeMap;
  }
}

export default new DateHelper();
