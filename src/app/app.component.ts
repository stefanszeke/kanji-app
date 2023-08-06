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
  chapters1 = Array.from(Array(15).keys()).map(i => i);
  chapters2 = Array.from(Array(3).keys()).map(i => i + 15);
  // chapters3 = Array.from(Array(15).keys()).map(i => i + 31);
  // chapters4 = Array.from(Array(15).keys()).map(i => i + 46);
  currentChapterIndex: number = 0;

  chapters = CHAPTERS;

  ngOnInit() {
    this.selectedChapter = [...CHAPTERS[this.currentChapterIndex].content];
    console.log(CHAPTERS[0]);
    console.log(this.chapters1);
  }

  selectChapter() {
    this.selectedChapter = [...CHAPTERS[this.currentChapterIndex].content];
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
      if (this.currentChapterIndex < CHAPTERS.length-1) {
        this.currentChapterIndex++;
      } else {
        this.currentChapterIndex = 0;
      }
    } else if (move == 'prev') {
      if (this.currentChapterIndex > 0) {
        this.currentChapterIndex--;
      } else {
        this.currentChapterIndex = CHAPTERS.length-1;
      }
    }
    this.selectChapter();
  }
}
