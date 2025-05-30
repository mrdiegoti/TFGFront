import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { CreateConversationComponent } from './pages/create-conversation/create-conversation.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { NbaScheduleComponent } from './pages/nba-schedule/nba-schedule.component';
import { EditConversationComponent } from './pages/edit-conversation/edit-conversation.component';
import { EditCommentComponent } from './pages/edit-comment/edit-comment.ts.component';
import { AllConversationsComponent } from './pages/all-conversations/all-conversations.component';
import { NbaGameDetailComponent } from './pages/nba-game-detail/nba-game-detail.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PlayoffsBracketComponent } from './pages/playoffs-bracket/playoffs-bracket.component';
import { NbaStandingsComponent } from './pages/nba-standings/nba-standings.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

// import { EditGameCommentComponent } from './pages/edit-game-comment/edit-game-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent,
    ConversationComponent,
    ComentariosComponent,
    CreateConversationComponent,
    HomeComponent,
    NbaScheduleComponent,
    EditConversationComponent,
    EditCommentComponent,
    AllConversationsComponent,
    NbaGameDetailComponent,
    PlayoffsBracketComponent,
    NbaStandingsComponent,
    AdminPanelComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
