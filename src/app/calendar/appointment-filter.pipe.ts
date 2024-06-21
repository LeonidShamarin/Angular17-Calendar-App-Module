import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from './appointment.service';

@Pipe({
  name: 'appointmentFilter'
})
export class AppointmentFilterPipe implements PipeTransform {
  transform(appointments: Appointment[] | null, date: Date): Appointment[] {
    if (!appointments) return [];
    return appointments.filter(app => 
      app.date.getFullYear() === date.getFullYear() &&
      app.date.getMonth() === date.getMonth() &&
      app.date.getDate() === date.getDate()
    );
  }
}