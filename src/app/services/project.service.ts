import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpclient : HttpClient) { }

  getProjects():Observable<Array<Project>>{
    return this.httpclient.get<Array<Project>>(`${environment.apiUrl}/projects`);
  }

  getProjectById(id:number):Observable<Project>{
    return this.httpclient.get<Project>(`${environment.apiUrl}/projects/${id}`);
  }

  addProject(project:Project):Observable<Project>{
    return this.httpclient.post<Project>(`${environment.apiUrl}/projects`,project);
  }

  updateProject(project:Project):Observable<Project>{
    return this.httpclient.put<Project>(`${environment.apiUrl}/projects`,project);
  }

  deleteProjectById(id:number):Observable<Project>{
    return this.httpclient.delete<Project>(`${environment.apiUrl}/projects/${id}`);
  }
}
