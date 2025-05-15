import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-edit-conversation',
  templateUrl: './edit-conversation.component.html',
  styleUrls: ['./edit-conversation.component.css']
})
export class EditConversationComponent implements OnInit {
  conversationId!: number;
  conversation: any;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.conversationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadConversation();
  }

  loadConversation(): void {
    this.forumService.getConversationById(this.conversationId).subscribe({
      next: (data) => this.conversation = data,
      error: (err) => console.error('Error loading conversation:', err)
    });
  }

  updateConversation(): void {
    this.forumService.updateConversation(this.conversationId, this.conversation).subscribe({
      next: () => this.router.navigate(['/forum']),
      error: (err) => console.error('Error updating conversation:', err)
    });
  }
}
