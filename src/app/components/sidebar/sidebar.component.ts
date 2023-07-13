import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/dashboard/dashboard.service';
import * as Highcharts from 'highcharts';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  apiResponse: any;
  newsDataList: any;
  uniqueAuthors: number;
  uniqueSource: unknown[];
  sourceChartData: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsPie: Highcharts.Options = {
    series: [
      {
        type: 'pie',

      }

    ]
  }
  chartOptionsBar: Highcharts.Options = {
    series: [
      {
        type: 'bar',

      }

    ]
  }

  constructor(private dService: DashboardService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.dService.newsArticleSubject.subscribe((res: any) => {    
      this.apiResponse = res;  
      this.newsDataList = res.articles;
      // if (this.newsDataList.length > 0){
        
        this.getUniqueAuthor();
        this.getUniqueSource()
      // }

      let pieData = [
        {
          name: 'Positive',
          y: this.getPostiveReviewCount()
        },
        {
          name: 'Negative',
          y: this.getNegativeReviewCount(),
        },
        {
          name: 'Neutral',
          y: this.getNeutralReviewCount()
        }
      ]

      this.createPieChart(pieData);

      // var datawebsiteViewsChart = {
      //   labels: ['Positive', 'Negative', 'Neutral'],
      //   series: [
      //     [this.getPostiveReviewCount(), this.getNegativeReviewCount(), this.getNeutralReviewCount()]

      //   ]
      // };
    })
  }

  createPieChart(data) {
    this.chartOptionsPie  = {
      series: [
        {
          type: 'pie',
          data: data
        }
      ],
      colors: ['#45a249', '#e8413d', '#6c757d'],
      title: {
        text: 'SentiMeter'
      },
      chart: {
        width: 200
      },
      credits: {
        enabled: false
      },
      plotOptions:{
        pie: {
          dataLabels: {
            enabled: false
        },
        showInLegend: true
        }
      }
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };


  
  getPostiveReviewCount(){
    return this.newsDataList.filter(res => res.analysis.sentiment.toLowerCase() == 'positive').length;
  }
  getNegativeReviewCount(){
    return this.newsDataList.filter(res => res.analysis.sentiment.toLowerCase() == 'negative').length;
  }
  getNeutralReviewCount(){
    return this.newsDataList.filter(res => res.analysis.sentiment.toLowerCase() == 'neutral').length;
  }

  getUniqueAuthor() {
    let authorsList = this.newsDataList.map(res => res.author);
    this.uniqueAuthors = [...new Set(authorsList)].length;
  }

  getUniqueSource(){
    let sourceList = this.newsDataList.map(res => res.source.name);
    this.uniqueSource  =  [...new Set(sourceList)];

    this.sourceChartData = this.uniqueSource.map(res => {
        return {
          name: res,
          y: sourceList.filter(data => data ==res).length
        }
    })
    this.createBarChart(this.sourceChartData)

   

    console.log(this.sourceChartData);
    
  }

  createBarChart(data){
    this.chartOptionsBar  = {
      series: [
        {
          type: 'bar',
          data: data
        }
      ],
      title: {
        text: 'Top Sources'
      },
      chart: {
        width: 250
      },
      credits: {
        enabled: false
      },
      plotOptions:{
        bar: {
          dataLabels: {
            enabled: false
        },
        showInLegend: true
        }
      }
    }
  }
}
