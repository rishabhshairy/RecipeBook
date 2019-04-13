import { CommonModule } from '@angular/common';
import { DropDownDirectiveDirective } from './drop-down-directive.directive';
import { NgModule } from '@angular/core';
@NgModule({
    declarations: [
        DropDownDirectiveDirective
    ],
    exports: [
        CommonModule,
        DropDownDirectiveDirective
    ]
})
export class SharedModule {

}
