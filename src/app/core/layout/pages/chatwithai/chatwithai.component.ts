import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AiService } from '../../../../shared/services/ai.service';
import { relative } from 'path';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../../../../shared/navigation/navigation.component';

@Component({
  selector: 'app-chatwithai',
  standalone: true,
  imports: [FormsModule, CommonModule, NavigationComponent],
  templateUrl: './chatwithai.component.html',
  styleUrl: './chatwithai.component.css'
})
export class ChatwithaiComponent {
  prompt = "";
  aiResponse: any;
  text: any;
  constructor(private aRoute: ActivatedRoute, private route: Router) { }

  aiService: AiService = inject(AiService)

  async submitPrompt() {
    this.aiResponse = await this.aiService.postAIResponse(this.prompt);
    this.text = this.aiResponse;
    }
}
