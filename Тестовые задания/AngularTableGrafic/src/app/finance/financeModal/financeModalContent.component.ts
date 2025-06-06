import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TableRow } from '../types/table-row.type';
import { FormFieldComponent } from '../financeTransactions/form-field/form-field.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-modal-content',
  standalone: true,
  templateUrl: './financeModalContent.component.html',
  imports: [FormFieldComponent, FormsModule]
})
export class FinanceModalContentComponent implements OnInit {
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() sum: string = '';
  @Input() date: string = '';
  @Input() editingRow: TableRow | null = null;

  @Output() save = new EventEmitter<TableRow>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onSave(): void {
    const rowData: TableRow = {
      id: this.editingRow ? this.editingRow.id : Date.now().toString(),
      category: this.category,
      sum: this.sum,
      data: this.date
    };
    this.save.emit(rowData);
    this.bsModalRef.hide();
  }

  onCancel(): void {
    this.bsModalRef.hide();
  }
} 