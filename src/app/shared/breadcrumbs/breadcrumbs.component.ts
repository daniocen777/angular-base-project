import { Component, OnInit } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label: string = "";
  constructor(private router: Router, public title: Title, public meta: Meta) {
    this.getDataRoute().subscribe(data => {
      this.label = data.snapshot.data.titulo;
      this.title.setTitle(this.label);
      // Cambiando los metatags
      let metaTag: MetaDefinition = {
        name: "description",
        content: this.label
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {}

  getDataRoute() {
    return this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .pipe(
        filter((event: ActivationEnd) => event.snapshot.firstChild === null)
      );
  }
}
