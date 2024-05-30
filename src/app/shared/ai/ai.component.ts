import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css',
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

export class AiComponent {
  constructor(private route: Router, private aRoute: ActivatedRoute, private aiService: AiService){}
  prompt = '';
  aiResponse: any;
  isOpen: boolean = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
    
  }

  async submitPrompt() {
    if (!this.prompt.trim()) return; 
    this.aiResponse = await this.aiService.postAIResponse(this.prompt);
    this.prompt = ''; 
  }
}