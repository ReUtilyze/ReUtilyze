import { environment } from 'src/environments/environment';
import { 
    Injectable,
    Pipe, 
    PipeTransform 
} from '@angular/core';  
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Pipe ({ 
    name: 'conversion' 
}) 

export class EncryptionPipe implements PipeTransform { 
    conversion = new HttpUrlEncodingCodec;
    transform(input: number, type: string): string { 
        console.log(this.conversion.encodeValue(input.toString()));
        if(type == 'encrypt'){
            return encodeURIComponent(input.toString());
        }else{
            return this.conversion.decodeValue(input.toString());
        }
    } 
} 