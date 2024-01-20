// import { environment } from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideRouter} from "@angular/router";
import {routes} from "./app/route";

// if (environment.production) {
//   enableProdMode();
// }

bootstrapApplication(AppComponent, {
    providers:[
        provideRouter(routes)
    ]

})
  .catch(err => console.error(err));
