import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { catchError, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  constructor(
    private http: HttpClient
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  isLoading = false;
  totalData = 0;
  EmpData = [];
  displayedColumns = ['designation', 'department', 'budget', 'location', 'lastUpdated']
    dataSource: any = [
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      },
      {
        designation: "Programmer Analyst",
        department: "Software Engineer",
        budget: "10L",
        location: "Ahmedabad",
        lastUpdated: "Rhea Kapoor"
      }
    ]

  getTableData$(pageNumber: Number, pageSize: Number) {
    console.log("========> ", pageNumber, pageSize);
    return this.http.get<any>(`http://localhost:3000/positions/4?page=${pageNumber}&limit=${pageSize}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoidGVzdHVzZXIzQGVtYWlsLmNvbSIsImlhdCI6MTcyNjU2MzQ2OSwiZXhwIjoxNzI3MTY4MjY5fQ.eLysW_wErgBWMEHYN2MEljRIkqmv6hA2IjgzyPO-NKI'
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    (this.paginator as MatPaginator).page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            (this.paginator as MatPaginator).pageIndex + 1,
            (this.paginator as MatPaginator).pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((res:any) => {
          if (res == null) return [];
          this.isLoading = false;
          this.totalData = res?.total;
          return res.positions;
        })
      )
      .subscribe((data) => {
        this.EmpData = data?.map((e: any) => ({
          designation: e?.designation?.title,
          department: e?.department?.name,
          budget: e?.budget,
          location: e?.location?.name,
          lastUpdated: e?.updatedBy?.firstName + " " + e?.updatedBy?.lastName
        }));
        this.dataSource = new MatTableDataSource(this.EmpData);
      });
  }
}
