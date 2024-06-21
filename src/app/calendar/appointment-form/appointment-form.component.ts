import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService , Appointment} from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  // @Input() appointment: Appointment | null = null;
  editingAppointment: boolean = false;
  appointmentForm: FormGroup;

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
      this.appointmentService.addAppointment(this.appointmentForm.value);
      this.appointmentForm.reset();
    }
  }
  editAppointment(appointment: Appointment): void {
    this.editingAppointment = true;
    this.appointmentForm.patchValue(appointment);
  }
  resetForm(): void {
    this.appointmentForm.reset();
  }
}