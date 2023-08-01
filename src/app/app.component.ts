import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Kanji } from './model/Kanji';
import { CHAPTERS } from './chapters/chapters';
import { KanjiItemComponent } from './components/kanji-item/kanji-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren(KanjiItemComponent) kanjiItems!: QueryList<KanjiItemComponent>;

  selectedChapter: Kanji[] = [];
  chapters = Array.from(Array(17).keys()).map(i => i + 1);
  currentChapter: number = 1;

  ngOnInit() {
    this.selectedChapter = [...CHAPTERS[this.currentChapter - 1]];
  }

  selectChapter() {
    this.selectedChapter = [...CHAPTERS[this.currentChapter - 1]];
  }

  toggleReversed() {
    this.kanjiItems.forEach(kanjiItem => {
      kanjiItem.toggleReversed();
    });
  }

  shulffle() {
    this.selectedChapter.sort(() => Math.random() - 0.5);
  }

  moveChapter(move: string) {
    if (move == 'next') {
      if (this.currentChapter < 17) {
        this.currentChapter++;
      } else {
        this.currentChapter = 1;
      }
    } else if (move == 'prev') {
      if (this.currentChapter > 1) {
        this.currentChapter--;
      } else {
        this.currentChapter = CHAPTERS.length;
      }
    }
    this.selectChapter();
  }
}
