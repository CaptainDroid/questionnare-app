import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { SpiderChartComponent } from '../spider-chart/spider-chart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  public questions;
  public surveyData;
  public surveyForm;
  public count = 0;
  public finished = false;
  public submitted = false;
  public chartData;

  constructor(private _questionsService: QuestionsService,
              private _router: Router) { }

  ngOnInit() {

    this.getSurveyQuestions();

  }

  getSurveyQuestions() {
    this._questionsService.getQuestions().subscribe(
      data => {
        this.surveyData = data;
        this.surveyForm = this.createFormGroup(this.surveyData);
      }
    );
  }

  createFormGroup(surveyData: any[]) {
    this.questions = [];
    // tslint:disable-next-line:prefer-const
    let group: any = {};
    console.log('Surevy data', surveyData);
    surveyData.forEach(questions => {
      questions.questions.forEach(question => {
        question.category = questions.category;
        question.key = question.category + '__' + question.id;
        this.questions.push(question);
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required) :
                                                new FormControl(question.value || '');
      });
    });
    return new FormGroup(group);
  }

  nextQuestion(question) {
    if (this.surveyForm.controls[question.key].valid) {
      this.count += 1;
    } else {
      this.surveyForm.controls[question.key].touched = true;
    }
  }

  prevQuestion(question) {
      this.count -= 1;
  }

  endSurvey() {
    console.log('End called');
    this.submitted = true;
    if (this.surveyForm.invalid) {
      return;
    }
    console.log(this.surveyForm);
    // tslint:disable-next-line:prefer-const
    let result = [];
    // tslint:disable-next-line:prefer-const
    let formData = {};
    // tslint:disable-next-line:prefer-const
    for (let key in this.surveyForm.controls) {
      if (this.surveyForm.controls.hasOwnProperty(key)) {
        this.questions.forEach((question, i) => {
          if (question.key === key) {
            if (!formData[question.key.split('__')[0]]) {
              formData[question.key.split('__')[0]] = 0;
            }

            let weight = 0;
            if (this.surveyForm.controls[key].value instanceof Array) {

              this.surveyForm.controls[key].value.forEach(val => {
                question.options.forEach((optn, j) => {
                  if (optn.id === val) {
                    weight += optn.weight;
                    question.options.splice(j, 1);
                    return;
                  }
                });
              });

            } else {

              question.options.forEach((optn, j) => {
                if (optn.id === this.surveyForm.controls[key].value) {
                  weight += optn.weight;
                  question.options.splice(j, 1);
                  return;
                }
              });

            }
            this.questions.splice(i, 1);
            formData[question.key.split('__')[0]] += weight;
          }
        });
      }
    }
    console.log('Values', formData);

    this.chartData = this.prepareChartData(formData);

    this.finished = true;
    // this._router.navigate(['finished']);
  }

  get f() {
    return this.surveyForm.controls;
  }

  prepareChartData(formData: any) {
    // tslint:disable-next-line:prefer-const
    let data = [[], [], []];
    for (const category in formData) {
      if (formData.hasOwnProperty(category)) {
        data[0].push(category);
        data[1].push(formData[category]);
        let num = Math.floor(Math.random() * 10) + 1; // this will get a number between 1 and 10;
        num *= Math.floor(Math.random() * 2 ) === 1 ? 1 : -1; // this will add a negative sign to it in 50% of the cases
        data[2].push(formData[category] + num);
      }
    }
    console.log('Chartdata', data);
    return data;
  }

}
