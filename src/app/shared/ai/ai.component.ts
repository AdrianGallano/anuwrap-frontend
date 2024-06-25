import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../services/ai.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css'],
  providers: [AiService],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class AiComponent implements OnInit {
  constructor(
    private route: Router,
    private aRoute: ActivatedRoute,
    private aiService: AiService,
    private cookieService: CookieService,
    private tokenService: TokenService
  ) {}

  prompt = '';
  conversation: { role: string, content: string }[] = [];
  isOpen: boolean = false;
  userId: string | null = null;

  ngOnInit() {
    const auth = this.tokenService.getAuth();
    if (auth) {
      this.userId = auth[1];
      this.loadConversation();
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async submitPrompt() {
    if (!this.prompt.trim()) return; 
    this.conversation.push({ role: 'user', content: this.prompt });
    this.saveConversation();
    
    const aiResponse = await this.aiService.postAIResponse(this.prompt);
    this.conversation.push({ role: 'ai', content: aiResponse });
    this.saveConversation();

    this.prompt = '';
  }

  saveConversation() {
    if (this.userId) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      const conversationData = JSON.stringify(this.conversation);
      this.cookieService.set(`conversation_${this.userId}`, conversationData, expiryDate, '/');
    }
  }

  loadConversation() {
    if (this.userId) {
      const conversationData = this.cookieService.get(`conversation_${this.userId}`);
      if (conversationData) {
        this.conversation = JSON.parse(conversationData);
      }
    }
  }
}
