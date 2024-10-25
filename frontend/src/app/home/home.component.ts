import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects:any
  selectedProject: any = {};
  selectedProjectData = '';
  blured = false
  focused = false
  defintion:any = null;

  editor: any;

  highlightedText: any;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects()
  }


  created(event: any) {
    console.log(event)
    this.editor = event
  }

  focus($event: any) {
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  contentChanged($event:any){
    this.selectedProject.project.textData = this.editor.container.innerText
  }

  getProjects(){
    this.projectService.getProjects().subscribe((result: any) => {
      this.projects = result?.data.projects;
    });
  }

  createProject() {
    this.projectService.createProject().subscribe({
      next: (result: any) => {
        this.selectedProject = result.data.createProject.project;
      },
      error: error => {
        console.error('Error creating project:', error);
      }
    });
  }

  getWordDefinition(word: string): void {
    this.projectService.getWordDefinition(word).subscribe((response: any) => {
      console.log(response[0].meanings[0].definitions[0].definition);
      this.defintion = response[0].meanings[0].definitions[0].definition
    });
  }
  onSelectionChanged($event:any){
    setTimeout(()=>{
      const selectionRange = this.editor.getSelection(true)
      this.highlightedText = this.editor.getText(selectionRange?.index, selectionRange?.length);
      console.log(this.highlightedText)
      if(this.highlightedText.trim()!==''){
        this.getWordDefinition(this.highlightedText)
      }
    }, 100)
  }
  getProject(id:string){
     this.projectService.getProjectById(parseInt(id)).subscribe((result: any) => {
      this.selectedProject = result?.data.project;
      this.selectedProjectData = result.data.project.textData
    });
  }

  updateTextData(projectId: number, newTextData: string) {
    this.projectService.updateProject(projectId, newTextData).subscribe({
      next: (result: any) => {
        this.selectedProject = result?.data.updateProject.project; 
        this.selectedProjectData = result.data.project.textData
      },
      error: error => {
        console.error('Error updating project:', error);
      }
    });
  }

logout(){
  localStorage.clear()
  this.router.navigate([''])
}
}
