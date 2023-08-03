import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostListComponent } from "./post-list/post-list.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { UpdatePostComponent } from "./update-post/update-post.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { postReducer } from "./state/posts.reducer";
import { POST_STATE_NAME } from "./state/post.selector";

const routes: Routes = [
  {
    path: '', component: PostListComponent, children: [
      { path: 'add', component: AddPostComponent },
      { path: 'edit/:id', component: UpdatePostComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PostListComponent,
    AddPostComponent,
    UpdatePostComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), StoreModule.forFeature(POST_STATE_NAME, postReducer)]
})
export class PostModule { }