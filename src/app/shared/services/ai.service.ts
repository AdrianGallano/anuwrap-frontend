import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, catchError, throwError } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { subscribe } from 'diagnostics_channel';


@Injectable({
  providedIn: 'root'
})

export class AiService {
  private generativeAI: GoogleGenerativeAI;
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=';
  constructor(private tokenService: TokenService, private http: HttpClient) {
    this.generativeAI = new GoogleGenerativeAI("AIzaSyAEpWDga9rWUbJ99WwF-DgwamUrPor7j6o");
  }

  async postAIResponse(aiPrompt: any): Promise<string> {
    const model = await this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(aiPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  }

}


