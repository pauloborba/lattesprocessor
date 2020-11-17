import  { Qualis } from '../common/Qualis';
import * as XLSX from 'xlsx';

export class QualisFactory {
    
    qualis: Qualis [] = new Array();
    workbook : XLSX.WorkBook;
    worksheet : XLSX.WorkSheet;
    fileContent : JSON;
    typeQualisContent : string;
    yearContent: number;
    readonly typesAvailable: string[] = ["periodico", "evento"];

    
    constructor() {
      this.clean()
    }

    readXls(type: string, year: number, file : string) {
        this.workbook = XLSX.read(file, {type : "binary"});
        this.worksheet = this.workbook.Sheets[this.workbook.SheetNames[0]];
        if (this.assertIsQualis(type) && this.assertType(type)) {
            this.fileContent = JSON.parse(JSON.stringify(XLSX.utils.sheet_to_json(this.worksheet)));
            this.yearContent = year;
            this.typeQualisContent = type.toLowerCase();
        }
    }

    assertIsQualis(typeQualis: string) : boolean {
        let range : XLSX.Range = XLSX.utils.decode_range(this.worksheet['!ref']);
        if (typeQualis.toLowerCase() === "periodico")
          if (this.assertColumns(range)) {
              return true;
          } else return false;
        else if (typeQualis.toLowerCase() === "evento"){
          if (this.assertColumnsEvents(range)) {
            return true;
          } else return false;
        }
    }

    assertColumnsEvents(range : XLSX.Range) : boolean {
      let refSigla = XLSX.utils.encode_cell({c:0, r:0});
      let refTitulo = XLSX.utils.encode_cell({c:1, r:0});
      let refEstrato = XLSX.utils.encode_cell({c:8, r:0});
      let cellISSN = this.worksheet[refSigla].v;
      let cellTitulo = this.worksheet[refTitulo].v;
      let cellEstrato = this.worksheet[refEstrato].v; 
      if (range.e.c == 10 && cellISSN == "SIGLA" && cellTitulo == "Nome Padrão" && cellEstrato == "Qualis Final") {
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

    assertType (type: string): boolean {
      return (this.typesAvailable.includes(type.toLowerCase())) ? true : false;
    }

    assertYear (year: string): boolean {
      return (typeof year === "number") ? true : false;
    }

    clean(type?: string, year?: number) {
      if (this.qualis) this.qualis = this.qualis.filter(q => !(q.ano === (year || q.ano) &&  q.tipo === (type || q.tipo)));
    }

    makeQualis() {
        let keys = Object.keys(this.fileContent);
        keys.forEach((key) => {
          if (this.typeQualisContent === "evento") {
            this.create(this.yearContent, this.fileContent[key]["Nome Padrão"], this.typeQualisContent, this.fileContent[key].SIGLA, this.fileContent[key]["Qualis Final"]);
          } else if (this.typeQualisContent === "periodico") {
            this.create(this.yearContent, this.fileContent[key].Título, this.typeQualisContent, this.fileContent[key].ISSN, this.fileContent[key].Estrato);
          }
            
        });
        this.fileContent = null
    }

    create(year:number, title: string, type: string, issn: string, rating: string) {
      if (!this.assertKey(year, title)) {
        this.qualis.push(new Qualis(title, year,type, issn, rating))
      }
    }

    get(): Qualis[] {
      return this.qualis;
    }
  
    assertKey(ano:number, titulo: string): boolean {
      const qualis = this.qualis.find(q => q.ano === ano && q.titulo === titulo);
      return (qualis)? true : false;
    }

    getFileContent(): JSON {
      return this.fileContent
    }
}