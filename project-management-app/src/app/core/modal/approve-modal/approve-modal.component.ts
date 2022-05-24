import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TRANSLATE } from 'src/app/shared/consts/translate';
import { LangService } from 'src/app/shared/services/lang.service';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-approve-modal',
  templateUrl: './approve-modal.component.html',
  styleUrls: ['./approve-modal.component.scss'],
})
export class ApproveModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private langService: LangService,
    @Inject(MAT_DIALOG_DATA) public data: boolean = false
  ) {}

  actionFunction() {
    this.data = true;
    this.closeModal();
  }

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
