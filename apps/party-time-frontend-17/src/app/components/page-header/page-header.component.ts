import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `@if (Title) {
    <h1>{{ Title }}</h1>
    }`,
  styles: ``,
})
export class PageHeaderComponent {
  @Input() Title: string | undefined;
}
