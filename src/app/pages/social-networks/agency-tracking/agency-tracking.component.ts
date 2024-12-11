
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { environment } from '../../../../environments/environment';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { InstagramService } from '../../../services/api/instagram.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { selectEntityData } from '../../../store/crud/crud.selectors';
import Settings from 'datatables.net';

import { UserService } from '../../../services/api/user.service';
import { getOne, getAllNoPagination } from '../../../store/crud/crud.actions';

@Component({
  selector: 'app-agency-tracking',
  templateUrl: './agency-tracking.component.html',
  styleUrl: './agency-tracking.component.scss'
})
export class AgencyTrackingComponent implements OnInit{

  private baseUrl = environment.apiUrl;

  website = '';  // Define and initialize the 'website' variable
  websiteInit = '';  // Define and initialize the 'website' variable
  trackingKey = '';  // Define and initialize the 'trackingKey' variable
  trackingCode = '';
  nbVisitor = 0;
  @ViewChild('trackingModal') trackingModal!: TemplateRef<any>;
  visitorEvents: any[] = [];

  dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true
  };

  constructor(private http: HttpClient,
              private userService:UserService, 
              private modalService: NgbModal,
              private store: Store,
            ) {}

  ngOnInit(): void {
    this.trackingCode = localStorage.getItem('trackingCode')??'';
    this.website = localStorage.getItem('website')??'';
    this.websiteInit = localStorage.getItem('website')??'';
    
    this.trackingKey = localStorage.getItem('trackingKey',)??'';

    // Get the current date
    const today = new Date();

    // Calculate one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    // Format the dates as strings (e.g., 'YYYY-MM-DD')
    this.startDate = this.formatDate(oneWeekAgo);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.endDate = this.formatDate(tomorrow);

    this.loadVisitorEvents();
  }

  // Helper function to format a Date object as 'YYYY-MM-DD'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  engagements_3: number[] = [];
  impressions_3: number[] = [];
  labels_3: string[] = [];
  backgroundColorChoice_3: number[] = [4, 5];
  borderColorChoice_3: number[] = [1, 1];
  fillChoice_3 = true;
  optionsChoice_3 = 1;

  private processLineData(lineData: any): void {
    this.engagements_3 = lineData?.visitors || [];
    this.impressions_3 = lineData?.interactions || [];
    this.labels_3 = lineData?.hours || [];
  }

  type: string = 'DAY'; // Default type
  startDate: string | null = null;
  endDate: string | null = null;

  onFilterChange(): void {
    this.loadVisitorEvents();
  }

  loadVisitorEvents(): void {
    const params = {
      type: this.type,
      start_date: this.startDate,
      end_date: this.endDate,
    };
  
    this.userService.getVisitorEvents(params).subscribe(
      (data: any) => {
        console.log(data);
        this.visitorEvents = data.visitorEvents;
        this.nbVisitor = data.nbVisitor;
        this.processLineData(data.line);
      },
      (error) => {
        console.error('Error fetching visitor events:', error);
      }
    );
  }

  loadVisitorEvents0(): void {

    this.userService.getVisitorEvents().subscribe(
      (data: any) => {
        console.log(data);
        this.visitorEvents = data.visitorEvents;
        this.nbVisitor = data.nbVisitor
        this.processLineData(data.line);
      },
      (error) => {
        console.error('Error fetching visitor events:', error);
      }
    );
  }

  quitConnection(){
    const email = localStorage.getItem('user_email');
    const requestData = {
      website: this.website,   // Value of the website input
      email: email,            // Value of the email from localStorage
      quit: true,            // Value of the email from localStorage
    };
    this.http.post(`${this.baseUrl}/tracking`, requestData)
      .subscribe((response: any) => {
        this.trackingCode = response.data['trackingCode'];
        this.trackingKey = response.data['trackingKey'];
        this.website ='';
        this.websiteInit ='';

        localStorage.setItem('trackingCode','');
        localStorage.setItem('website','');
        localStorage.setItem('trackingKey','');
        // Open modal once tracking code is received
        // this.openModal(this.trackingModal);
      }, (error) => {
        console.error('Error occurred:', error);
      });
  }

  submitTrackingForm() {
    // Retrieve email from localStorage
    const email = localStorage.getItem('user_email');

    // Prepare the request data
    const requestData = {
      website: this.website,  // Value of the website input
      email: email            // Value of the email from localStorage
    };
    console.log(requestData);
    // Send the request
    this.http.post(`${this.baseUrl}/tracking`, requestData)
      .subscribe((response: any) => {
        this.trackingCode = response.data['trackingCode'];
        this.trackingKey = response.data['trackingKey'];
        this.website = this.website;
        this.websiteInit = this.website;

        localStorage.setItem('trackingCode',this.trackingCode);
        localStorage.setItem('website',this.website);
        localStorage.setItem('trackingKey',this.trackingKey);
        // Open modal once tracking code is received
        this.openModal(this.trackingModal);
      }, (error) => {
        console.error('Error occurred:', error);
      });
  }

  CopyCode(){
    this.openModal(this.trackingModal);
  }



  // Open modal method
  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Copy to clipboard method
  copyToClipboard() {
    const textarea = document.getElementById('trackingCode') as HTMLTextAreaElement;
    textarea.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
  }


}


