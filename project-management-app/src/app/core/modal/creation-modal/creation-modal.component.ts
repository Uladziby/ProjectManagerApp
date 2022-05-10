import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.component.html',
  styleUrls: ['./creation-modal.component.scss'],
})
export class CreationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private langService: LangService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public lang$ = this.langService.lang$;
  modalText = TRANSLATE.en.modal;

  closeModal() {
    this.dialogRef.close();
  }
  private subs!: Subscription;

  ngOnInit(): void {
    this.subs = this.langService.lang$.subscribe((lang) => {
      this.modalText =
        lang === 'English' ? TRANSLATE.en.modal : TRANSLATE.ru.modal;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
