import  {Qualis} from '../common/qualis';
import * as XLSX from 'xlsx';

export class QualisFactory {
    // add atributes here
    qualisTable : Qualis;
    workbook : XLSX.WorkBook;
    worksheet : XLSX.WorkSheet;
    fileContent : JSON = null;
    // add methods here
    readXls(file : string) {
        this.workbook = XLSX.read(file, {type : "binary"});
        this.worksheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
        if (this.assertIsQualis()) {
            this.fileContent = JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(this.worksheet)));
        }
    }

    assertIsQualis() : boolean {
        let range : XLSX.Range = XLSX.utils.decode_range(this.worksheet['!ref']);
        if (this.assertColumns(range)) {
            return true;
        } else return false;
    }

    assertColumns(range : XLSX.Range) : boolean {
        let refISSN = XLSX.utils.encode_cell({c:0, r:0});
        let refTitulo = XLSX.utils.encode_cell({c:1, r:0});
        let refEstrato = XLSX.utils.encode_cell({c:2, r:0});
        let cellISSN = this.worksheet[refISSN].v;
        let cellTitulo = this.worksheet[refTitulo].v;
        let cellEstrato = this.worksheet[refEstrato].v; 
        if (range.e.c == 2 && cellISSN == "ISSN" && cellTitulo == "Título" && cellEstrato == "Estrato") {
            return true;
        } else return false;
    }

    makeQualis() {
        this.qualisTable = new Qualis();
        let keys = Object.keys(this.fileContent);
        keys.forEach((key) => {
            this.qualisTable.addEntry(this.fileContent[key].Título, this.fileContent[key].ISSN, this.fileContent[key].Estrato);
        });
    }

    getFileContent() : JSON {
        return this.fileContent;
    }

    getQualis() : Qualis {
        return this.qualisTable;
    }
}