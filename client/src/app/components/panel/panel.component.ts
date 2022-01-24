import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';
import { CreateInvitationComponent } from '../create-invitation/create-invitation.component';
import { QrcodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  invitations: Invintation[] = [];
  displayedColumns: string[] = ['select', 'index', 'name', 'email', 'registered', 'emailSent', 'qrcode', 'actions'];

  dataSource = new MatTableDataSource<Invintation>();
  selection = new SelectionModel<Invintation>(true, []);
  isLoggedIn: boolean;

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.fetchInvitation();
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

  addNewInvitation() {
    this.dialog.open(CreateInvitationComponent).afterClosed().subscribe(() => this.fetchInvitation());
  }

  fetchInvitation() {
    this.api.getInvitations().subscribe(response => {
      this.invitations = response;
      this.dataSource = new MatTableDataSource<Invintation>(this.invitations);
    });
  }

  sendEmailsToListOfUsers() {
    const ids = this.selection.selected.map(s => s._id);
    if (ids) {
      this.api.sendEmails(ids as string[]).subscribe(() => {
        this.snackBar.open("Email succeessfully sent", "Close", { duration: 2000 })
        this.fetchInvitation()
      });
    }
  }


  generateQRcode(event: Event, invitation: Invintation) {
    event.stopPropagation();
    if (invitation._id) {
      this.api.generateQRcodeById(invitation._id).subscribe(() => {
        this.snackBar.open("QRCode succeessfully created", "Close", { duration: 2000 })
        this.fetchInvitation()
      });
    }
  }

  displayQRcode(event: Event,invitation: Invintation) {
    event.stopPropagation();
    this.dialog.open(QrcodeComponent, { data: { invitation } });
  }

  sendEmailToUser(event: Event, userId: any) {
    event.stopPropagation();
    this.api.sendEmails([userId] as string[]).subscribe(() => {
      this.snackBar.open("Email succeessfully sent", "Close", { duration: 2000 })
      this.fetchInvitation()
    });
  }
}
