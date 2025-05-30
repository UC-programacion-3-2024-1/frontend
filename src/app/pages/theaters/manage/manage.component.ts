import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  theater: Theater;
  constructor(private activatedRoute: ActivatedRoute,
    private theaterService: TheaterService,
    private router: Router
  ) {
    this.mode = 0;
    this.theater = { id: 0 }
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.theater.id = this.activatedRoute.snapshot.params.id
      this.getTheater(this.theater.id)
    }
  }
  getTheater(id: number) {
    this.theaterService.view(id).subscribe({
      next: (theater) => {
        this.theater = theater;
        console.log('Theater fetched successfully:', this.theater);
      },
      error: (error) => {
        console.error('Error fetching theater:', error);
      }
    });
  }
  back(){
    this.router.navigate(['/theaters/list']);
  }
  create() {
    this.theaterService.create(this.theater).subscribe({
      next: (theater) => {
        console.log('Theater created successfully:', theater);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/theaters/list']);
      },
      error: (error) => {
        console.error('Error creating theater:', error);
      }
    });
  }
  update() {
    this.theaterService.update(this.theater).subscribe({
      next: (theater) => {
        console.log('Theater updated successfully:', theater);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/theaters/list']);
      },
      error: (error) => {
        console.error('Error updating theater:', error);
      }
    });
  }

}
