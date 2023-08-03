import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { getPosts } from '../state/post.selector';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  posts$: Observable<Post[]> = new Observable<Post[]>

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts)
  }

  deletePost(id: any) {
    this.store.dispatch(deletePost({ id: id }))
  }

}