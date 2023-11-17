import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kanji } from 'src/app/model/Kanji';

@Component({
  selector: 'app-kanji-item',
  templateUrl: './kanji-item.component.html',
  styleUrls: ['./kanji-item.component.scss']
})
export class KanjiItemComponent {
  @Input() kanji: any;
  @Input() saveMode!: boolean;
  @Input() saved!: boolean;
  @Output() kanjiSelected: EventEmitter<Kanji> = new EventEmitter();
  reversed: boolean = false;
  hidden: boolean = true;

  toggleHidden() {
    if(this.saveMode) {
      this.kanjiSelected.emit(this.kanji);
      return;
    }
    this.hidden = !this.hidden;
  }
  
  toggleReversed() {
    if(this.saveMode) return;
    this.reversed = !this.reversed;
  }
}
