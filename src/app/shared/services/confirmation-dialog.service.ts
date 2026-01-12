import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <!-- <h2 mat-dialog-title>Deletar produto</h2> -->
<mat-dialog-content>
  Deseja realmente deletar esse produto ?
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button (click)="onNot()">Não</button>
  <button mat-button (click)="onYes()" color="accent" cdkFocusInitial>Sim</button>
</mat-dialog-actions>
`,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)

  onNot() {
    this.matDialogRef.close(false)
  }

  onYes() {
    this.matDialogRef.close(true)
  }

}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog)


  constructor() { }

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()

  }
}
