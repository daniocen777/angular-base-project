import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";

import { SharedModule } from "../shared/shared.module";

import { FormsModule } from "@angular/forms";

import { PagesComponent } from "./pages.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";

// temporales
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [CommonModule, SharedModule, PAGES_ROUTES, FormsModule, PipesModule]
})
export class PagesModule {}
