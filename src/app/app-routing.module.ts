import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';

import { SignInComponent } from './accounts/sign-in/sign-in.component';
import { SignUpComponent } from './accounts/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './accounts/forgot-password/forgot-password.component';
import { AuthGuard } from './guard/auth.guard';
import { VerifyEmailComponent } from './accounts/verify-email/verify-email.component';


import { EditorComponent } from './main/editor/editor.component';
import { ThemePickerComponent } from './main/pickers/theme-picker/theme-picker.component';
import { TextPickerComponent } from './main/pickers/text-picker/text-picker.component';
import { MediaPickerComponent } from './main/pickers/media-picker/media-picker.component';
import { MusicPickerComponent } from './main/pickers/music-picker/music-picker.component';
import { FormatPickerComponent } from './main/pickers/format-picker/format-picker.component';
import { StoryboardComponent } from './main/components/themes/storyboard/storyboard.component';
import { BrandComponent } from './main/components/themes/brand/brand.component';
import { BasicInfoComponent } from './main/components/texts/basic-info/basic-info.component';
import { DescriptionComponent } from './main/components/texts/description/description.component';
import { TemplatesComponent } from './main/components/texts/templates/templates.component';
import { MediaUsedComponent } from './main/components/medias/media-used/media-used.component';
import { MediaSearchComponent } from './main/components/medias/media-search/media-search.component';
import { MusicLibraryComponent } from './main/components/musics/music-library/music-library.component';
import { MusicUploadsComponent } from './main/components/musics/music-uploads/music-uploads.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'loading',
    canActivate: [AuthGuard],
    component: LoadingComponent
  },
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'theme',
        component: ThemePickerComponent,
        children: [
          {
            path: 'storyboard',
            component: StoryboardComponent
          },
          {
            path: 'brand',
            component: BrandComponent
          },
          {
            path: '**',
            redirectTo: 'storyboard'
          }
        ]
      },
      {
        path: 'text',
        component: TextPickerComponent,
        children: [
          {
            path: 'basic-info',
            component: BasicInfoComponent
          },
          {
            path: 'desc',
            component: DescriptionComponent
          },
          {
            path: 'templates',
            component: TemplatesComponent
          },
          {
            path: '**',
            redirectTo: 'basic-info'
          }
        ]
      },
      {
        path: 'media',
        component: MediaPickerComponent,
        children: [
          {
            path: 'used',
            component: MediaUsedComponent
          },
          {
            path: 'search',
            component: MediaSearchComponent
          },
          {
            path: '**',
            redirectTo: 'used'
          }
        ]
      },
      {
        path: 'music',
        component: MusicPickerComponent,
        children: [
          {
            path: 'library',
            component: MusicLibraryComponent
          },
          {
            path: 'uploads',
            component: MusicUploadsComponent
          },
          {
            path: '**',
            redirectTo: 'library'
          }
        ]
      },
      {
        path: 'format',
        component: FormatPickerComponent
      },
      {
        path: '**',
        redirectTo: 'theme'
      }
    ]
  },

  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
