import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { AppbarComponent } from './layout/appbar/appbar.component';
import { EditorComponent } from './main/editor/editor.component';
import { AppribbonComponent } from './layout/appribbon/appribbon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerComponent } from './main/picker/picker.component';
import { ThemePickerComponent } from './main/pickers/theme-picker/theme-picker.component';
import { CanvasEditorComponent } from './main/canvas-editor/canvas-editor.component';
import { TextPickerComponent } from './main/pickers/text-picker/text-picker.component';
import { MediaPickerComponent } from './main/pickers/media-picker/media-picker.component';
import { MusicPickerComponent } from './main/pickers/music-picker/music-picker.component';
import { FormatPickerComponent } from './main/pickers/format-picker/format-picker.component';
import { PickerSelectorComponent } from './main/pickers/picker-selector/picker-selector.component';
import { ThemeComponent } from './main/components/themes/theme/theme.component';
import { StoryboardComponent } from './main/components/themes/storyboard/storyboard.component';
import { BrandComponent } from './main/components/themes/brand/brand.component';
import { BasicInfoComponent } from './main/components/texts/basic-info/basic-info.component';
import { DescriptionComponent } from './main/components/texts/description/description.component';
import { TemplatesComponent } from './main/components/texts/templates/templates.component';
import { MediaUsedComponent } from './main/components/medias/media-used/media-used.component';
import { MediaSearchComponent } from './main/components/medias/media-search/media-search.component';
import { MusicLibraryComponent } from './main/components/musics/music-library/music-library.component';
import { MusicUploadsComponent } from './main/components/musics/music-uploads/music-uploads.component';
import { MusicListComponent } from './main/components/musics/music-list/music-list.component';
import { MusicPlayerComponent } from './main/components/musics/music-player/music-player.component';
import { DragDropComponent } from './main/components/drag-drop/drag-drop.component';
import { DragDropDirective } from './main/components/drag-drop/drag-drop.directive';
import { SocialSlideComponent } from './main/components/formats/social-slide/social-slide.component';
import { SingleSlideComponent } from './main/components/formats/single-slide/single-slide.component';
import { CanvasPaneComponent } from './main/components/canvas-pane/canvas-pane.component';
import { CanvasTextComponent } from './main/components/canvas-text/canvas-text.component';
import { TextFormatComponent } from './main/components/text-format/text-format.component';
import { SceneAdvancedDialogComponent } from './main/components/scene-advanced-dialog/scene-advanced-dialog.component';
import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './accounts/verify-email/verify-email.component';
import { PreviewDialogComponent } from './main/components/preview-dialog/preview-dialog.component';
import { TextContainerComponent } from './main/components/texts/text-container/text-container.component';
import { PublishDialogComponent } from './main/components/publish-dialog/publish-dialog.component';
import { MediaDialogComponent } from './main/components/media-dialog/media-dialog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoadingComponent,
    AppbarComponent,
    EditorComponent,
    AppribbonComponent,
    PickerComponent,
    ThemePickerComponent,
    CanvasEditorComponent,
    TextPickerComponent,
    MediaPickerComponent,
    MusicPickerComponent,
    FormatPickerComponent,
    PickerSelectorComponent,
    ThemeComponent,
    StoryboardComponent,
    BrandComponent,
    BasicInfoComponent,
    DescriptionComponent,
    TemplatesComponent,
    MediaUsedComponent,
    MediaSearchComponent,
    MusicLibraryComponent,
    MusicUploadsComponent,
    MusicListComponent,
    MusicPlayerComponent,
    DragDropComponent,
    DragDropDirective,
    SocialSlideComponent,
    SingleSlideComponent,
    CanvasPaneComponent,
    CanvasTextComponent,
    TextFormatComponent,
    SceneAdvancedDialogComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PreviewDialogComponent,
    TextContainerComponent,
    PublishDialogComponent,
    MediaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    ClickOutsideModule,
    FlexLayoutModule,
    NgbModule,
    PerfectScrollbarModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
    MatDialogModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  entryComponents: [
    SceneAdvancedDialogComponent,
    PreviewDialogComponent,
    PublishDialogComponent,
    MediaDialogComponent
  ],
  providers: [
    AuthService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
