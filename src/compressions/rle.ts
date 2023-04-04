
export class RunLengthEncodedCharacter {
    public character : string = "";
    public run : number = 0;
}

export class RunLengthEncodedString {
    public characters : RunLengthEncodedCharacter[] = new Array();
}

export function runLengthEncode(text : string | string[]) : RunLengthEncodedString {
    if(typeof text == "string"){
        const r : string[] = new Array(0);
        for(let i = 0;i<text.length;i++){
            r.push(text[i]);
        }
        return runLengthEncode(r);
    }else{
        if(text.length == 0){
            return new RunLengthEncodedString();
        }else{
            const r = new RunLengthEncodedString();
    
            let c : string = text[0];
            let num : number = 1;
        
            for(let i = 1;i<text.length;i++){
                if(c != text[i]){
                    const item = new RunLengthEncodedCharacter();
                    item.character = c;
                    item.run = num;
                    r.characters.push(item);
                    c = text[i];
                    num = 1;
                }else{
                    num++;
                }            
            }
            const item = new RunLengthEncodedCharacter();
            item.character = c;
            item.run = num;
            r.characters.push(item);
    
            return r;
        
        }    

    }
}