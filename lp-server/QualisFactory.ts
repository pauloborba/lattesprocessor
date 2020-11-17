import { Qualis } from '../common/Qualis';

export class QualisFactory {

    qualis: Qualis[] = new Array();

    constructor(){
       this.qualis = [];
    }

    getQualis(): Qualis[] {
        return this.qualis;
    }
}