import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CdkOverlayOrigin } from "@angular/cdk/overlay";

@Component({
  selector: 'app-no-itens',
  standalone: true,
  imports: [MatCardModule, CdkOverlayOrigin],
  templateUrl: './no-itens.component.html',
  styleUrl: './no-itens.component.scss'
})
export class NoItensComponent {

}
