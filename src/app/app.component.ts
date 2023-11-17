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
  chapters2 = Array.from(Array(12).keys()).map(i => i + 15);
  // chapters3 = Array.from(Array(15).keys()).map(i => i + 31);
  // chapters4 = Array.from(Array(15).keys()).map(i => i + 46);
  currentChapterIndex: number = 0;

  chapters = CHAPTERS;

  saveMode: boolean = false;
  onSavedKanji: boolean = false;
  savedKanji: Kanji[] = [];
  saveModeText: string = 'Save Mode Off';
  saveModeRed: boolean = false;

  ngOnInit() {
    this.selectedChapter = [...CHAPTERS[this.currentChapterIndex].content];
    console.log(CHAPTERS[0]);
    console.log(this.chapters1);

    this.savedKanji = JSON.parse(localStorage.getItem('savedKanji') || '[]');
  }

  selectChapter() {
    this.selectedChapter = [...CHAPTERS[this.currentChapterIndex].content];
    this.onSavedKanji = false;
    this.saveMode = false;
    this.setSaveModeText();
  }

  isSaved(kanji: Kanji):boolean {
    if (this.savedKanji.find(k => k.kanji == kanji.kanji)){
      console.log("saved");
      return true;
    }
    return false;

  }

  toggleReversed() {
    this.kanjiItems.forEach(kanjiItem => {
      kanjiItem.toggleReversed();
    });
  }

  shulffle() {
    this.selectedChapter.sort(() => Math.random() - 0.5);
  }

  toggleSave() {
    this.saveMode = !this.saveMode;
    this.setSaveModeText();
  }

  setSaveModeText() {
    if(!this.onSavedKanji) {
      if(this.saveMode) {
        this.saveModeText = 'Save Mode On';
        this.saveModeRed = true;
      } else {
        this.saveModeText = 'Save Mode Off';
        this.saveModeRed = false;
      }
    } else {
      if(this.saveMode) {
        this.saveModeText = 'delete Mode On';
        this.saveModeRed = true;
      } else {
        this.saveModeText = 'delete Mode Off';
        this.saveModeRed = false;
      }
    }
  }

  handleKanjiSelected(kanji: Kanji) {
    this.savedKanji.find(k => k.kanji == kanji.kanji) ? this.removeKanji(kanji) : this.addKanji(kanji);
    localStorage.setItem('savedKanji', JSON.stringify(this.savedKanji));
    if (this.onSavedKanji) this.loadSaved();
  }

  addKanji(kanji: Kanji) {
    this.savedKanji.push(kanji);
  }

  removeKanji(kanji: Kanji) {
    this.savedKanji = this.savedKanji.filter(k => k.kanji != kanji.kanji);
  }

  loadSaved() {
    this.selectedChapter = [...this.savedKanji];
    if(!this.onSavedKanji) this.saveMode = false;
    this.onSavedKanji = true;
    this.setSaveModeText();
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
