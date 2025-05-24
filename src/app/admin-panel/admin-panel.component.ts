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

  newUser: any = {};
  editUser: any = null;

  newConversation: any = {};
  editConversation: any = null;

  newComment: any = {};
  editComment: any = null;

  newGameComment: any = {};
  editGameComment: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadConversations();
    this.loadComments();
    this.loadGameComments();
  }

  editUserData(user: any) {
  this.editUser = { ...user, password: '' }; // Password vacío por seguridad
}

editConversationData(conversation: any) {
  this.editConversation = { ...conversation };
}

editCommentData(comment: any) {
  this.editComment = { ...comment };
}

editGameCommentData(gameComment: any) {
  this.editGameComment = { ...gameComment };
}

  // Cargar datos
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

  // Usuarios
  startEditUser(user: any) {
    this.editUser = { ...user, password: '' };
  }

  updateUser() {
    this.adminService.updateUser(this.editUser.id, this.editUser).subscribe(() => {
      this.editUser = null;
      this.loadUsers();
    });
  }

  deleteUser(id: number) {
    if(confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  // Conversaciones
  startEditConversation(conv: any) {
    this.editConversation = { ...conv };
  }

  updateConversation() {
  const data = {
    titulo: this.editConversation.titulo,
    descripcion: this.editConversation.descripcion
  };

  this.adminService.updateConversation(this.editConversation.id, data).subscribe({
    next: () => {
      console.log('Conversación actualizada con éxito');
      this.editConversation = null;
      this.loadConversations();
    },
    error: (error) => {
      console.error('Error al actualizar conversación:', error);
      alert('Error al actualizar conversación');
    }
  });
}



  deleteConversation(id: number, commentsCount: number) {
    if (commentsCount > 0) {
      alert('No se puede eliminar la conversación porque tiene comentarios.');
      return;
    }
    if(confirm('¿Seguro que quieres eliminar esta conversación?')) {
      this.adminService.deleteConversation(id).subscribe(() => this.loadConversations());
    }
  }

  // Comentarios
  startEditComment(comment: any) {
    this.editComment = { ...comment };
  }

  updateComment() {
    const data = {
      texto: this.editComment.texto
    };
    this.adminService.updateComment(this.editComment.id, data).subscribe(() => {
      this.editComment = null;
      this.loadComments();
    });
  }

  deleteComment(id: number) {
    if(confirm('¿Seguro que quieres eliminar este comentario?')) {
      this.adminService.deleteComment(id).subscribe(() => this.loadComments());
    }
  }

  // Comentarios de partidos
  startEditGameComment(comment: any) {
    this.editGameComment = { ...comment };
  }

  updateGameComment() {
    const data = {
      texto: this.editGameComment.texto
    };
    this.adminService.updateGameComment(this.editGameComment.id, data).subscribe(() => {
      this.editGameComment = null;
      this.loadGameComments();
    });
  }

  deleteGameComment(id: number) {
    if(confirm('¿Seguro que quieres eliminar este comentario de partido?')) {
      this.adminService.deleteGameComment(id).subscribe(() => this.loadGameComments());
    }
  }
}
