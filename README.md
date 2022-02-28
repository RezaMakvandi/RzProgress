# RzProgress

Progress bar for Angular 2+ --- 
rxjs 7+ is needed

# Install

```
npm install rz-progress --save
```
After install, import BrowserAnimationsModule in your app.module.ts file

```javascript
{
...
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
  @NgModule({
  imports: [
    RzProgressModule,
    BrowserAnimationsModule
  ],
  ...
})

```
Complete config reference:

| Key                   | Type    | Description                                                                                                          | Example                                         |
|-----------------------|---------|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|
| progressValue         | number | The value for percentage of the progress bar                                                    | 50                                            |
| showValue       | boolean | Whether to show the percentage value in bar or not. Default is false                                                                            | false                                           |
