import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { getPostById } from '../state/post.selector';
import { updatePost } from '../state/posts.action';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) { }
  postForm: any
  post: Post | undefined

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.store.select(getPostById, { id }).subscribe((data) => {
        this.post = data;
        this.createForm();
      })
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [Validators.required]),
      description: new FormControl(this.post?.description, [Validators.required])
    })
  }

  updatePost() {
    const post: Post = {
      id: this.post?.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(updatePost({ post: post }))
    this.router.navigate(['ngRx']);
  }
}
