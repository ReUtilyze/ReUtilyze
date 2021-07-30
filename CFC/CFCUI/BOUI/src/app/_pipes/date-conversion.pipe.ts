import { 
    Pipe, 
    PipeTransform 
 } from '@angular/core';  
 
 @Pipe ({ 
    name: 'DateToISO' 
 }) 
 
 export class DateToISOPipe implements PipeTransform { 
    transform(fileName: string): string { 
        //var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        return 'fileExt';
    } 
 } 