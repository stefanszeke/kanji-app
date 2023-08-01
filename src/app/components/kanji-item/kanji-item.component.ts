import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanji-item',
  templateUrl: './kanji-item.component.html',
  styleUrls: ['./kanji-item.component.scss']
})
export class KanjiItemComponent {
  @Input() kanji: any;
  reversed: boolean = false;
  hidden: boolean = true;

  toggleHidden() {
    this.hidden = !this.hidden;
  }
  
  toggleReversed() {
    this.reversed = !this.reversed;
  }
}
