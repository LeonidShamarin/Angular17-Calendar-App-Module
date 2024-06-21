import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService, Appointment } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  editingAppointment: Appointment | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.appointmentForm.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      if (this.editingAppointment) {
        this.appointmentService.updateAppointment(this.appointmentForm.value);
      } else {
        this.appointmentService.addAppointment(this.appointmentForm.value);
      }
      this.appointmentForm.reset();
      this.editingAppointment = false;
    }
  }
  editAppointment(appointment: Appointment): void {
    this.editingAppointment = appointment;
    this.appointmentForm.patchValue({
      title: appointment.title,
      date: appointment.date
    });
  }
  resetForm(): void {
    this.appointmentForm.reset();
    this.editingAppointment = false;
  }
}