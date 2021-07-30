import { 
   Pipe, 
   PipeTransform 
} from '@angular/core';  

@Pipe ({ 
   name: 'Ext' 
}) 

export class FileExtensionPipe implements PipeTransform { 
   transform(fileName: string): string { 
      var fileExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      return fileExt.toLowerCase();
   } 
} 