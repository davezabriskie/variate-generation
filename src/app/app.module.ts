import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FunctionParametersComponent } from './function-parameters/function-parameters.component';
import { ExponentialComponent } from './variate-functions/functions/exponential/exponential.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FunctionSelectComponent } from './function-select/function-select.component';
import { MatSelectModule } from '@angular/material/select';
import { GammaComponent } from './variate-functions/functions/gamma/gamma.component';
import { BernoulliComponent } from './variate-functions/functions/bernoulli/bernoulli.component';
import { GeometricComponent } from './variate-functions/functions/geometric/geometric.component';
import { NormalComponent } from './variate-functions/functions/normal/normal.component';
import { WeibullComponent } from './variate-functions/functions/weibull/weibull.component';
import { PoissonComponent } from './variate-functions/functions/poisson/poisson.component';
import { BinomialComponent } from './variate-functions/functions/binomial/binomial.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    FunctionParametersComponent,
    ExponentialComponent,
    FunctionSelectComponent,
    GammaComponent,
    BernoulliComponent,
    GeometricComponent,
    NormalComponent,
    WeibullComponent,
    PoissonComponent,
    BinomialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxChartsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
