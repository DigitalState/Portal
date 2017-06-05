import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent: string = ``;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal(action?: any) {
    this.activeModal.close(action);
  }
}
