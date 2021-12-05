import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  invitations: Invintation[] = [];
  displayedColumns: string[] = ['select', 'index', 'name', 'mobile', 'email', 'registered', 'emailSent', 'smsSent'];

  dataSource = new MatTableDataSource<Invintation>();
  selection = new SelectionModel<Invintation>(true, []);

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getInvitations().subscribe(response => {
      this.invitations = response;
      console.log(this.invitations);
      this.dataSource = new MatTableDataSource<Invintation>(this.invitations);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
