import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  @ViewChild('componentModal', { static: false, read: ViewContainerRef }) entry: ViewContainerRef;
  isCreated: boolean = false;
  isNotCreated: boolean = false;
  message: string = "";

  constructor(private projectService: ProjectService,
    private resolver: ComponentFactoryResolver,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getProjects().subscribe(projectdata => this.projects = projectdata);
  }

  addProject() {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(AddProjectComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.project = { name: '', description: '', prefix: '', startDate: new Date().toISOString().slice(0,19), endDate: null };
    componentRef.instance.outputEvent.subscribe(
      val => {
        if ('error' in val) {
          this.toastr.error('Error', val.error.message,{ timeOut: 5000 });
        }
        else {
          this.getAllProjects();
          this.message = "Project successfully created";
          this.toastr.success('Success', this.message,{ timeOut: 5000 });
          this.destroyComponent(componentRef);
        }
        
      }
    );
  }

  updateProject(project: Project) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(AddProjectComponent);
    let componentRef = this.entry.createComponent(factory);
    componentRef.instance.project = Object.assign({},project);
    componentRef.instance.outputEvent.subscribe(
      val => {
        if ('error' in val) {
          this.toastr.error('Error', val.error.message,{ timeOut: 5000 });
        }
        else {
          this.getAllProjects();
          this.message = "Project successfully updated";
          this.toastr.success('Success', this.message,{ timeOut: 5000 });
          this.destroyComponent(componentRef);
        }
      }
    );
  }

  deleteProject(id: number){
    let isOkToDelete : boolean = confirm("Do you really want to delete this element"+id);
    if(isOkToDelete){
      this.projectService.deleteProjectById(id).subscribe(
        iteam =>{
          this.message = "Project successfully deleted";
          this.toastr.success('Success', this.message,{ timeOut: 5000 });
          this.getAllProjects();
        }
      );
    }
  }


  destroyComponent(componentRef : ComponentRef<AddProjectComponent>) {
    componentRef.destroy();
}

}
