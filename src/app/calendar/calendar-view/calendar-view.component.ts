import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { AppointmentService, Appointment } from '../appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component'; // Import AppointmentFormComponent

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  appointments$: Observable<Appointment[]>;
  dates: Date[];
  currentMonth: Date;

  constructor(private appointmentService: AppointmentService) {
    this.appointments$ = this.appointmentService.getAppointments();
    this.currentMonth = new Date();
    this.dates = this.generateDatesForMonth(this.currentMonth);
  }

  ngOnInit(): void {}

  generateDatesForMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  }

  onDrop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const appointment = event.container.data[event.currentIndex];
    const newDate = this.dates[event.currentIndex];
    this.appointmentService.updateAppointment({ ...appointment, date: newDate });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id);
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.dates = this.generateDatesForMonth(this.currentMonth);
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.dates = this.generateDatesForMonth(this.currentMonth);
  }


  @ViewChild(AppointmentFormComponent) appointmentForm!: AppointmentFormComponent;
  editAppointment(appointment: Appointment): void {
    this.appointmentForm.editAppointment(appointment);
  }
}