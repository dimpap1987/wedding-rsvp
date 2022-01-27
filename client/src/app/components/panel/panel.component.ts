import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
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
  displayedColumns: string[] = ['select', 'index', 'name', 'email', 'registered', 'adults', 'children', 'emailSent', 'qrcode', 'actions'];
  displayedTotalColumns = ['totalAmountTitle', 'emptyFooter', 'emptyFooter', 'emptyFooter', 'emptyFooter', 'totalAdults', 'totalChildren', 'emptyFooter', 'emptyFooter', 'emptyFooter'];

  dataSource = new MatTableDataSource<Invintation>();
  selection = new SelectionModel<Invintation>(true, []);
  isLoggedIn: boolean;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  sortedData!: Invintation[];

  constructor(private api: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.fetchInvitation();
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

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
      this.sortedData = this.invitations.slice();
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

  displayQRcode(event: Event, invitation: Invintation) {
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

  getTotalAdults() {
    return this.invitations.reduce((total, inv) => {
      if (inv.numberOfAdults) {
        return total += inv.numberOfAdults;
      } else {
        return total += 0;
      }
    }, 0);
  }

  getTotalChildren() {
    return this.invitations.reduce((total, inv) => {
      if (inv.numberOfChildren) {
        return total += inv.numberOfChildren;
      } else {
        return total += 0;
      }
    }, 0);
  }

  deleteInvitation(event: Event, invitationId: string) {
    event.stopPropagation();
    this.api.deleteInvitations([invitationId])
      .subscribe(() => {
        this.snackBar.open("Successfully deleted", "Close", { duration: 2000 })
        this.fetchInvitation()
      });
  }

  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.invitations.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'registered':
        case 'emailSent':
          return Number(a.registered) - Number(b.registered);
        case 'adults':
        case 'children':
          return this.compare(a.numberOfAdults, b.numberOfAdults, isAsc);
        default:
          return 0;
      }
    });
  }
}
