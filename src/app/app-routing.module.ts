import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { CreateConversationComponent } from './pages/create-conversation/create-conversation.component';
import { HomeComponent } from './pages/home/home.component';
import { NbaScheduleComponent } from './pages/nba-schedule/nba-schedule.component';
import { EditConversationComponent } from './pages/edit-conversation/edit-conversation.component';
import { AllConversationsComponent } from './pages/all-conversations/all-conversations.component';
import { NbaGameDetailComponent } from './pages/nba-game-detail/nba-game-detail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nueva-conversacion', component: CreateConversationComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'conversacion/:id', component: ConversationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'conversacion/:id/comentarios', component: ComentariosComponent },
  { path: 'nba-schedule', component: NbaScheduleComponent },
  { path: 'edit-conversation/:id', component: EditConversationComponent },
  { path: 'conversaciones', component: AllConversationsComponent },
  { path: 'nba-schedule', component: NbaScheduleComponent },
  { path: 'nba/game/:id', component: NbaGameDetailComponent },
  { path: '**', redirectTo: '' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
