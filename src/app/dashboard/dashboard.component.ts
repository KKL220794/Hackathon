import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newsDataList: any = [];
  apiResponse: any;
  uniqueAuthors: number = 0;
  uniqueSource: any ;
  sourceChartData: any;

  constructor(private dService: DashboardService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 100,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
          
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      
      //start animation for the Emails Subscription Chart
      
      this.dService.newsArticleSubject.subscribe((res: any) => {    
        this.apiResponse = res;  
        this.newsDataList = res.articles;
        // if (this.newsDataList.length > 0){
          
          this.getUniqueAuthor();
          this.getUniqueSource()
        // }
        var datawebsiteViewsChart = {
          labels: ['Postive', 'Negative', 'Neutral'],
          series: [
            [this.getPostiveReviewCount(), this.getNegativeReviewCount(), this.getNeutralReviewCount()]
  
          ]
        };
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(websiteViewsChart);
        
      })
  }

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
            key: res,
            value: sourceList.filter(data => data ==res).length
          }
      })

      console.log(this.sourceChartData);
      
    }




}
