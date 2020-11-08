import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  display: string = 'block';
  isCreated : boolean = true;
  formContent: FormGroup;
  @Input() project: Project;
  @Output() outputEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.initForm();
    this.isCreated = ! ('id' in this.project);
  }

  formSubmit(form: NgForm) {
    /* start create project object part*/
    this.createProject(form);
    /* End create project object part*/
    
    /* start add project part*/
    if(this.isCreated){
      this.projectService.addProject(this.project).subscribe(
        data => {
          this.onCloseModal();
          this.outputEvent.emit(data);
        },
        err =>{
          //this.onCloseModal();
          this.outputEvent.emit(err);
        }
      );
    }
    /* End add project part*/
    /* start update project part*/
    else{
      this.projectService.updateProject(this.project).subscribe(
        data => {
          this.onCloseModal();
          this.outputEvent.emit(data);
        },
        err =>{
          this.outputEvent.emit(err);
        }
      );
    }
    /* End update project part*/
  }

  initForm() {
    this.formContent = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      description: this.project.description,
      prefix: this.project.prefix,
      startDate: this.project.startDate,
      endDate: this.project.endDate
    });
  }

  onCloseModal() {
    this.display = 'none';
  }

  createProject(form : NgForm){
    this.project.name = form.value['name'];
    this.project.description = form.value['description'];
    this.project.prefix = form.value['prefix'];
    this.project.startDate = form.value['startDate'];
    this.project.endDate = form.value['endDate'];
  }

}

/*
this.formContent = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      description: this.project.description,
      prefix: [this.project.prefix, Validators.required],
      startDate: [this.project.startDate, Validators.required],
      endDate: [this.project.endDate, Validators.required]
    });
*/