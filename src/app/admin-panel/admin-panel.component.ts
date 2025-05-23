import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  conversations: any[] = [];
  comments: any[] = [];
  gameComments: any[] = [];

  

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadConversations();
    this.loadComments();
    this.loadGameComments();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(data => this.users = data);
  }
  loadConversations() {
    this.adminService.getConversations().subscribe(data => this.conversations = data);
  }
  loadComments() {
    this.adminService.getComments().subscribe(data => this.comments = data);
  }
  loadGameComments() {
    this.adminService.getGameComments().subscribe(data => this.gameComments = data);
  }

  // Métodos para crear, editar, eliminar (similar, con formularios modales o confirmaciones)
  deleteUser(id: number) {
    if(confirm('¿Seguro que quieres eliminar este usuario?')){
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  deleteConversation(id: number, commentsCount: number) {
    if (commentsCount > 0) {
      alert('No se puede eliminar la conversación porque tiene comentarios.');
      return;
    }
    if(confirm('¿Seguro que quieres eliminar esta conversación?')){
      this.adminService.deleteConversation(id).subscribe(() => this.loadConversations());
    }
  }

  deleteComment(id: number) {
    if(confirm('¿Seguro que quieres eliminar este comentario?')){
      this.adminService.deleteComment(id).subscribe(() => this.loadComments());
    }
  }

  deleteGameComment(id: number) {
    if(confirm('¿Seguro que quieres eliminar este comentario de partido?')){
      this.adminService.deleteGameComment(id).subscribe(() => this.loadGameComments());
    }
  }
}
