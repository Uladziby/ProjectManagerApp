import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private langService: LangService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closeModal() {
    this.dialogRef.close(this.data);
  }

  private subs!: Subscription;
  public lang$ = this.langService.lang$;
  modalText = TRANSLATE.en.modal;

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
